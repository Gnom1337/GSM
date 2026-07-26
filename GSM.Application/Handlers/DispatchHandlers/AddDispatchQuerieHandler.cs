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
    public class AddDispatchQuerieHandler : IRequestHandler<AddDispatchQuerie, BaseResponse<Dispatch>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        public AddDispatchQuerieHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository)
        {
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        public async Task<BaseResponse<Dispatch>> Handle(AddDispatchQuerie request, CancellationToken cancellationToken)
        {
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetById(int.Parse(userId.Value));
            if (tank != null)
            {
                var result = await _unitOfWork.DispatchRepository.AddAsync(new Dispatch
                {
                     DispatchDate = request.DispatchDate,
                     CreatedAt = DateTime.UtcNow,
                     DriverName = request.DriverName,
                     RecipientOrg = request.RecipientOrg,
                     TruckNumber = request.TruckNumber,
                     VolumeInvoiceLiters = request.VolumeInvoiceLiters,
                     WaybillNumber = request.WaybillNumber,
                     Tank = tank,
                     User = user,
                             
                     
                });
                tank.CurentVolumeLiters -= request.VolumeInvoiceLiters;
                await _unitOfWork.TankRepository.UpdateAsync(tank);
                await _unitOfWork.SaveChangesAsync();
                return new BaseResponse<Dispatch> { Status = result.Status, Message = result.Message };
            }
            else
            {
                return new BaseResponse<Dispatch> { Status = "Error", Message = "Произошла ошибка" };
            }
        }
    }
}
