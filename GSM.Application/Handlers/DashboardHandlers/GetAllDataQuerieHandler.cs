using GSM.Application.DTOs;
using GSM.Application.Queries.DashboardQueries;
using GSM.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GSM.Application.Handlers.DashboardHandlers
{
    public class GetAllDataQuerieHandler : IRequestHandler<GetAllDataQuerie, DashboardDto>
    {
        public IUnitOfWork _unitOfWork;
        public GetAllDataQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<DashboardDto> Handle(GetAllDataQuerie request, CancellationToken cancellationToken)
        {
            var recived = await _unitOfWork.WagonReceiptRepository.GetSumAsync
                (predicate: w => w.CreatedAt >= request.From && w.CreatedAt < request.To.AddDays(1), 
                selector: a=>a.VolumeActualLiters);
            var dispatched = await _unitOfWork.DispatchRepository.GetSumAsync
                (predicate: w => w.CreatedAt >= request.From && w.CreatedAt < request.To.AddDays(1), 
                selector: v => v.VolumeInvoiceLiters);
            var currentVolume = await _unitOfWork.TankRepository.GetSumAsync(
                selector: x => x.CurentVolumeLiters);

            var receiptsAfter = await _unitOfWork.WagonReceiptRepository.GetSumAsync(
                x => x.CreatedAt >= request.To.AddDays(1),
                x => x.VolumeActualLiters);

            var dispatchesAfter = await _unitOfWork.DispatchRepository.GetSumAsync(
                x => x.CreatedAt >= request.To.AddDays(1),
                x => x.VolumeInvoiceLiters);

            var volumeAtEndDate =
                currentVolume
                - receiptsAfter
                + dispatchesAfter;
            //
            var chart = new List<DailyChartDto>();

            for (var day = request.From.Date; day <= request.To.Date; day = day.AddDays(1))
            {
                var incoming = await _unitOfWork.WagonReceiptRepository.GetSumAsync(
                    predicate: x =>
                        x.CreatedAt >= day &&
                        x.CreatedAt < day.AddDays(1),
                    selector: x => x.VolumeActualLiters);

                var outgoing = await _unitOfWork.DispatchRepository.GetSumAsync(
                    predicate: x =>
                        x.CreatedAt >= day &&
                        x.CreatedAt < day.AddDays(1),
                    selector: x => x.VolumeInvoiceLiters);

                chart.Add(new DailyChartDto
                {
                    date = day,
                    received = incoming,
                    dispatched = outgoing
                });
            }
            var tanks = await _unitOfWork.TankRepository.GetAllAsync( null, x => x.Product);
            var tankStatus = tanks.Select(x => new TankStatusDto
            {
                tankId = x.TankId,
                number = x.TankNumber,
                product = x.Product.Name,
                currentVolume = x.CurentVolumeLiters,
                capacity = x.CapacityLiters,
                percent = x.CapacityLiters == 0
                ? 0
                : Math.Round(
                    x.CurentVolumeLiters / x.CapacityLiters * 100,
                    1)
                    }).ToList();
            var receipts = (await _unitOfWork.WagonReceiptRepository.GetAllAsync(null, x => x.Tank,x => x.Product))
                .Select(x => new RecentOperationDto
                {
                    Id = x.WagonReceiptId,
                    Type = "receipt",
                    Title = $"Поступление вагона № {x.WagonNumber}",
                    Description = $"{x.Tank.TankNumber} {x.Product.Name} +{x.VolumeActualLiters:N0} л",
                    DateTime = x.CreatedAt
                });
            var dispatches = (await _unitOfWork.DispatchRepository.GetAllAsync())
                .Select(x => new RecentOperationDto
                {
                    Id = x.DispatchId,
                    Type = "dispatch",
                    Title = $"Отгрузка {x.TruckNumber}",
                    Description = $"{x.RecipientOrg} -{x.VolumeInvoiceLiters:N0} л",
                    DateTime = x.CreatedAt
                });
            var measurements = (await _unitOfWork.TankMeasurementRepository.GetAllAsync(null, x => x.Tank))
                .Select(x => new RecentOperationDto
                {
                    Id = x.TankMeasurementsId,
                    Type = "measurement",
                    Title = $"Замер резервуара № {x.Tank.TankNumber}",
                    Description = $"Фактический объем: {x.VolumeLiters:N0} л",
                    DateTime = x.MeasuredAt
                });
            var recentOperations = receipts
            .Concat(dispatches)
            .Concat(measurements)
            .OrderByDescending(x => x.DateTime)
            .Take(10)
            .ToList();
            return new DashboardDto
            {
                 TotalReceived = recived,
                 TotalDispatched = dispatched,
                 CurrentVolume = volumeAtEndDate,
                 DailyStats = chart,
                 Tanks = tankStatus,
                 operations = recentOperations,
            };
        }
    }
}
