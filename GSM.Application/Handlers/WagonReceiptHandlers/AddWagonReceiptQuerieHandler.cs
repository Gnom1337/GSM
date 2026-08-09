using GSM.Application.Abstractions;
using GSM.Application.Queries.WagonReceiptQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace GSM.Application.Handlers.WagonReceiptHandlers
{
    public class AddWagonReceiptQuerieHandler : IRequestHandler<AddWagonReceiptQuerie, BaseResponse<WagonReceipt>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AddWagonReceiptQuerieHandler(IUnitOfWork unitOfWork, IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<BaseResponse<WagonReceipt>> Handle(AddWagonReceiptQuerie request, CancellationToken cancellationToken)
        {
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            var product = await _unitOfWork.ProductRepository.GetById(request.ProductId);
            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetById(int.Parse(userId.Value));
            if (request.Status == "Отгружен")
            {
                tank.CurentVolumeLiters += request.VolumeActualLiters;
                await _unitOfWork.TankRepository.UpdateAsync(tank);
            }
            
            var result = await _unitOfWork.WagonReceiptRepository.AddAsync(new WagonReceipt
            {
                 CreatedAt = DateTime.UtcNow,
                 ReceiptDate = request.ReceiptDate,
                 VolumeActualLiters = request.VolumeActualLiters,
                 VolumeInvoiceLiters = request.VolumeInvoiceLiters,
                 WagonNumber = request.WagonNumber,
                 WaybillNumber = request.WaybillNumber,
                 DiscrepancyLiters = request.VolumeInvoiceLiters - request.VolumeActualLiters,
                 Tank = tank,
                 Product = product,
                 User = user,
                 Status = request.Status,
                       
            });
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse<WagonReceipt> { Status = result.Status, Message = result.Message };
        }
    }
}
