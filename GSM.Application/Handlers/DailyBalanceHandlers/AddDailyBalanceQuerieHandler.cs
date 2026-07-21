using GSM.Application.Queries.DailyBalanceQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DailyBalanceHandlers
{
    public class AddDailyBalanceQuerieHandler : IRequestHandler<AddDailyBalanceQuerie, BaseResponse<DailyBalance>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public AddDailyBalanceQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<DailyBalance>> Handle(AddDailyBalanceQuerie request, CancellationToken cancellationToken)
        {
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            if (tank != null)
            {
                var result = await _unitOfWork.DailyBalanceRepository.AddAsync(new DailyBalance
                {
                    BalanceDate = request.BalanceDate,
                    ClosingVolumeActual = request.ClosingVolumeActual,
                    OpeningVolume = request.OpeningVolume,
                    TotalDispatched = request.TotalDispatched,
                    TotalReceived = request.TotalReceived,
                    Tank = tank

                });
                await _unitOfWork.SaveChangesAsync();
                return new BaseResponse<DailyBalance> { Status = result.Status, Message = result.Message };
            }
            else
            {
                return new BaseResponse<DailyBalance> { Status = "Error", Message = "Произошла ошибка" };
            }
        }
    }
}
