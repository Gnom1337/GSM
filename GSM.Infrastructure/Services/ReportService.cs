using GSM.Application.DTOs;
using GSM.Domain.Interfaces;
using GSM.Infrastructure.Data;
using GSM.Infrastructure.Services.Reports;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Services
{
    public class ReportService : IReportService
    {

        private readonly ApplicationDbContext _db;
        private readonly PdfReportGenerator _pdf;



        public ReportService(
        ApplicationDbContext db,
        PdfReportGenerator pdf)
        {
            _db = db;
            _pdf = pdf;
        }





        public byte[] GenerateDailyBalance(
        DateOnly date,
        int? tankId)
        {


            var tanks = _db.Tanks
    .Include(x => x.Product)
    .Where(x => x.TankId == tankId)
    .ToList();






            var result = new List<DailyBalanceDto>();


            foreach (var tank in tanks)
            {

                var opening =
                _db.TankMeasurements
                .Where(x =>
                x.TankId == tank.TankId &&
                DateOnly.FromDateTime(x.MeasuredAt) < date)
                .OrderByDescending(x => x.MeasuredAt)
                .Select(x => x.VolumeLiters)
                .FirstOrDefault();




                var received =
                _db.WagonReceipts
                .Where(x =>
                x.TankId == tank.TankId &&
                x.ReceiptDate == date)
                .Sum(x => x.VolumeActualLiters);




                var dispatched =
                _db.Dispatches
                .Where(x =>
                x.TankId == tank.TankId &&
                x.DispatchDate == date)
                .Sum(x => x.VolumeInvoiceLiters);




                var actual =
                _db.TankMeasurements
                .Where(x =>
                x.TankId == tank.TankId &&
                DateOnly.FromDateTime(x.MeasuredAt) == date)
                .OrderByDescending(x => x.MeasuredAt)
                .Select(x => x.VolumeLiters)
                .FirstOrDefault();





                result.Add(new DailyBalanceDto
                {

                    Date = date,

                    TankId = tank.TankId,

                    TankNumber = tank.TankNumber,

                    ProductName = tank.Product.Name,


                    OpeningVolume = opening,


                    TotalReceived = received,


                    TotalDispatched = dispatched,


                    ClosingVolumeCalculated =
                opening +
                received -
                dispatched,


                    ClosingVolumeActual = actual,


                    LossLiters =
                (opening + received - dispatched) - actual

                });


            }


            return _pdf.GenerateDailyBalance(result);

        }






        public byte[] GenerateTurnover(
      DateOnly from,
      DateOnly to,
      int? productId)
        {

            var tanks = _db.Tanks
                .Include(x => x.Product)
                .AsQueryable();


            if (productId.HasValue)
            {
                tanks = tanks.Where(x =>
                    x.ProductId == productId.Value);
            }


            var tankList = tanks.ToList();


            var result = new List<TurnoverDto>();


            foreach (var tank in tankList)
            {

                var received =
                    _db.WagonReceipts
                    .Where(x =>
                        x.TankId == tank.TankId &&
                        x.ReceiptDate >= from &&
                        x.ReceiptDate <= to)
                    .Sum(x => (double?)x.VolumeActualLiters) ?? 0;



                var dispatched =
                    _db.Dispatches
                    .Where(x =>
                        x.TankId == tank.TankId &&
                        x.DispatchDate >= from &&
                        x.DispatchDate <= to)
                    .Sum(x => (double?)x.VolumeInvoiceLiters) ?? 0;



                result.Add(new TurnoverDto
                {
                    ProductName = tank.Product.Name,

                    TankNumber = tank.TankNumber,

                    ReceivedLiters = received,

                    DispatchedLiters = dispatched
                });

            }


            return _pdf.GenerateTurnover(result);
        }





        public byte[] GenerateLoss(
        DateOnly from,
        DateOnly to,
        int? tankId)
        {


            var data =
            _db.TankMeasurements
            .Include(x => x.Tank)
            .ThenInclude(x => x.Product)
            .Where(x =>
            DateOnly.FromDateTime(x.MeasuredAt) >= from &&
            DateOnly.FromDateTime(x.MeasuredAt) <= to)
            .ToList();



            if (tankId.HasValue)
            {
                data = data
                .Where(x => x.TankId == tankId)
                .ToList();
            }



            var result =
            data.Select(x => new LossDto
            {

                Date =
            DateOnly.FromDateTime(x.MeasuredAt),

                TankNumber =
            x.Tank.TankNumber,


                ProductName =
            x.Tank.Product.Name,


                ActualVolume =
            x.VolumeLiters,


                CalculatedVolume =
            x.Tank.CurentVolumeLiters


            }).ToList();



            return _pdf.GenerateLoss(result);

        }
    }
}
