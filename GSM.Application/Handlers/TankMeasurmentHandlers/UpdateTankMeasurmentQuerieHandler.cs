using GSM.Application.Abstractions;
using GSM.Application.Queries.TankMeasurmentQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace GSM.Application.Handlers.TankMeasurmentHandlers
{
    public class UpdateTankMeasurmentQuerieHandler : IRequestHandler<UpdateTankMeasurmentQuerie, BaseResponse<TankMeasurement>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        public UpdateTankMeasurmentQuerieHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository)
        {
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        public async Task<BaseResponse<TankMeasurement>> Handle(UpdateTankMeasurmentQuerie request, CancellationToken cancellationToken)
        {
            var tankMeasurement = await _unitOfWork.TankMeasurementRepository.GetById(request.TankMeasurementsId);
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetById(int.Parse(userId.Value));
            if (tankMeasurement != null)
            {
                tankMeasurement.Tank = tank;
                tankMeasurement.VolumeLiters = request.VolumeLiters;
                tankMeasurement.User = user;
                tankMeasurement.MeasuredAt = request.MeasuredAt;
                tankMeasurement.FuelHeight = request.FuelHeight;
                tankMeasurement.Note = request.Note;
                tankMeasurement.Status = request.Status;
                var result = await _unitOfWork.TankMeasurementRepository.UpdateAsync(tankMeasurement);
                await _unitOfWork.SaveChangesAsync();
                return new BaseResponse<TankMeasurement> { Status = result.Status, Message = result.Message };
            }
            return new BaseResponse<TankMeasurement> { Status = "Error", Message = "Произошла ошибка" };
        }
    }
}
