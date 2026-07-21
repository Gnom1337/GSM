using GSM.Application.Queries.WagonReceiptQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.WagonReceiptHandlers
{
    public class AddWagonReceiptQuerieHandler : IRequestHandler<AddWagonReceiptQuerie, BaseResponse<WagonReceipt>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public AddWagonReceiptQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<WagonReceipt>> Handle(AddWagonReceiptQuerie request, CancellationToken cancellationToken)
        {
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            var product = await _unitOfWork.ProductRepository.GetById(request.ProductId);
            var result = await _unitOfWork.WagonReceiptRepository.AddAsync(new WagonReceipt
            {
                 CreatedAt = DateTime.UtcNow,
                 ReceiptDate = request.ReceiptDate,
                 VolumeActualLiters = request.VolumeActualLiters,
                 VolumeInvoiceLiters = request.VolumeInvoiceLiters,
                 WagonNumber = request.WagonNumber,
                 WaybillNumber = request.WaybillNumber,
                 Tank = tank,
                 Product = product,
                 User = request.User,
                       
            });
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse<WagonReceipt> { Status = result.Status, Message = result.Message };
        }
    }
}
