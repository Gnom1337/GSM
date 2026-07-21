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
    public class UpdateTankMeasurmentQuerieHandler : IRequestHandler<UpdateTankMeasurmentQuerie, BaseResponse<TankMeasurement>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public UpdateTankMeasurmentQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<TankMeasurement>> Handle(UpdateTankMeasurmentQuerie request, CancellationToken cancellationToken)
        {
            var tankMeasurement = await _unitOfWork.TankMeasurementRepository.GetById(request.TankMeasurementsId);
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            if (tankMeasurement != null)
            {
                tankMeasurement.Tank = tank;
                tankMeasurement.VolumeLiters = request.VolumeLiters;
                tankMeasurement.User = request.User;
                tankMeasurement.MeasuredAt = request.MeasuredAt;
                tankMeasurement.Note = request.Note;
                var result = await _unitOfWork.TankMeasurementRepository.UpdateAsync(tankMeasurement);
                await _unitOfWork.SaveChangesAsync();
                return new BaseResponse<TankMeasurement> { Status = result.Status, Message = result.Message };
            }
            return new BaseResponse<TankMeasurement> { Status = "Error", Message = "Произошла ошибка" };
        }
    }
}
