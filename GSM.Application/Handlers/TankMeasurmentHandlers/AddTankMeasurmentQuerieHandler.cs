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
    public class AddTankMeasurmentQuerieHandler : IRequestHandler<AddTankMeasurmentQuerie, BaseResponse<TankMeasurement>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AddTankMeasurmentQuerieHandler(IUnitOfWork unitOfWork, IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<BaseResponse<TankMeasurement>> Handle(AddTankMeasurmentQuerie request, CancellationToken cancellationToken)
        {
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetById(int.Parse(userId.Value));
            if (tank != null)
            {
                tank.CurentVolumeLiters = request.VolumeLiters;
                await _unitOfWork.TankRepository.UpdateAsync(tank);
                var result = await _unitOfWork.TankMeasurementRepository.AddAsync(new TankMeasurement
                {
                    MeasuredAt = DateTime.Now,
                    Note = request.Note,
                    User = user,
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
