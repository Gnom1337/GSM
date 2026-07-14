using GSM.Application.Queries.DailyBalanceQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DailyBalanceHandlers
{
    public class UpdateDailyBalanceQuerieHandler : IRequestHandler<UpdateDailyBalanceQuerie, BaseGetByIdResponse<DailyBalance>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public UpdateDailyBalanceQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseGetByIdResponse<DailyBalance>> Handle(UpdateDailyBalanceQuerie request, CancellationToken cancellationToken)
        {
            var dailyBalance = await _unitOfWork.DailyBalanceRepository.GetById(request.DailyBalanceId);
            if (dailyBalance != null)
            {
                if (dailyBalance.TankId != request.TankId)
                {
                    var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
                    dailyBalance.Tank = tank;

                    dailyBalance.TotalDispatched = request.TotalDispatched;
                    dailyBalance.BalanceDate = request.BalanceDate;
                    dailyBalance.ClosingVolumeCalculated = request.ClosingVolumeCalculated;
                    dailyBalance.ClosingVolumeActual = request.ClosingVolumeActual;
                    dailyBalance.LossLiters = request.LossLiters;
                    dailyBalance.TotalReceived = request.TotalReceived;
                    dailyBalance.OpeningVolume = request.OpeningVolume;
                    var result = await _unitOfWork.DailyBalanceRepository.UpdateAsync(dailyBalance);
                    await _unitOfWork.SaveChangesAsync();
                    return new BaseGetByIdResponse<DailyBalance> { Status = result.Status, Message = result.Message };
                }
                else
                {
                    dailyBalance.TotalDispatched = request.TotalDispatched;
                    dailyBalance.BalanceDate = request.BalanceDate;
                    dailyBalance.ClosingVolumeCalculated = request.ClosingVolumeCalculated;
                    dailyBalance.ClosingVolumeActual = request.ClosingVolumeActual;
                    dailyBalance.LossLiters = request.LossLiters;
                    dailyBalance.TotalReceived = request.TotalReceived;
                    dailyBalance.OpeningVolume = request.OpeningVolume;
                    var result = await _unitOfWork.DailyBalanceRepository.UpdateAsync(dailyBalance);
                    await _unitOfWork.SaveChangesAsync();
                    return new BaseGetByIdResponse<DailyBalance> { Status = result.Status, Message = result.Message };
                }
            }
            else
            {
                return new BaseGetByIdResponse<DailyBalance>
                {
                    Status = "Error",
                    Message = "Произошла ошибка"
                };
            }
        }
    }
}
