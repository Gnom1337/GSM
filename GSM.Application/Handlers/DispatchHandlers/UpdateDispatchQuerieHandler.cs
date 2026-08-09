using GSM.Application.Abstractions;
using GSM.Application.Queries.DispatchQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace GSM.Application.Handlers.DispatchHandlers
{
    public class UpdateDispatchQuerieHandler : IRequestHandler<UpdateDispatchQuerie, BaseResponse<Dispatch>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        public UpdateDispatchQuerieHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository)
        {
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        public async Task<BaseResponse<Dispatch>> Handle(UpdateDispatchQuerie request, CancellationToken cancellationToken)
        {
            var dispatch = await _unitOfWork.DispatchRepository.GetById(request.DispatchId);
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetById(int.Parse(userId.Value));
            if (dispatch != null)
            {
                if (dispatch.Status != request.Status)
                {
                    if (dispatch.Status == "Отгружен" && request.Status == "Не отгружен" || request.Status == "В ожидании")
                    {
                        tank.CurentVolumeLiters += request.VolumeInvoiceLiters;
                        await _unitOfWork.TankRepository.UpdateAsync(tank);
                    }
                    else if(dispatch.Status == "Не отгружен" ||  dispatch.Status =="В ожидании" &&  request.Status == "Отгружен")
                    {
                        tank.CurentVolumeLiters -= request.VolumeInvoiceLiters;
                        await _unitOfWork.TankRepository.UpdateAsync(tank);
                    }
                }
                dispatch.DispatchDate = request.DispatchDate;
                dispatch.User= user;
                dispatch.Tank = tank;
                dispatch.DriverName = request.DriverName;
                dispatch.RecipientOrg = request.RecipientOrg;
                dispatch.WaybillNumber = request.WaybillNumber;
                dispatch.VolumeInvoiceLiters = request.VolumeInvoiceLiters;
                dispatch.TruckNumber = request.TruckNumber;
                dispatch.Status = request.Status;
                var result = await _unitOfWork.DispatchRepository.UpdateAsync(dispatch);
                await _unitOfWork.SaveChangesAsync();
                return new BaseResponse<Dispatch> { Status = result.Status, Message = result.Message };
            }
            return new BaseResponse<Dispatch> { Status = "Error", Message = "Произошла ошибка" };
        }
    }
}
