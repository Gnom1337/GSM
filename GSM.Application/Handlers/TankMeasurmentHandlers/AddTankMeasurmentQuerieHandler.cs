using GSM.Application.Queries.TankMeasurmentQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.TankMeasurmentHandlers
{
    public class AddTankMeasurmentQuerieHandler : IRequestHandler<AddTankMeasurmentQuerie, BaseResponse<TankMeasurement>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public AddTankMeasurmentQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<TankMeasurement>> Handle(AddTankMeasurmentQuerie request, CancellationToken cancellationToken)
        {
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            if (tank != null)
            {
                var result = await _unitOfWork.TankMeasurementRepository.AddAsync(new TankMeasurement
                {
                    MeasuredAt = DateTime.Now,
                    Note = request.Note,
                    User = request.User,
                    VolumeLiters = request.VolumeLiters,
                    Tank = tank

                });
                await _unitOfWork.SaveChangesAsync();
                return new BaseResponse<TankMeasurement> { Status = result.Status, Message = result.Message };
            }
            else
            {
                return new BaseResponse<TankMeasurement> { Status = "Error", Message = "Произошла ошибка" };
            }
        }
    }
}
