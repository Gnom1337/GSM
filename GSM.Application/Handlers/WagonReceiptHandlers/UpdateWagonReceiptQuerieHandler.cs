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
    public class UpdateWagonReceiptQuerieHandler : IRequestHandler<UpdateWagonReceiptQuerie, BaseResponse<WagonReceipt>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public UpdateWagonReceiptQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<WagonReceipt>> Handle(UpdateWagonReceiptQuerie request, CancellationToken cancellationToken)
        {
            var wagonReceipt = await _unitOfWork.WagonReceiptRepository.GetById(request.WagonReceiptId);
            var product = await _unitOfWork.ProductRepository.GetById(request.ProductId);
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            if (wagonReceipt.TankId != request.TankId)
            {
                var oldTank = await _unitOfWork.TankRepository
                    .GetById(wagonReceipt.TankId);

                var newTank = await _unitOfWork.TankRepository
                    .GetById(request.TankId);

                oldTank.CurentVolumeLiters -= wagonReceipt.VolumeActualLiters;

                newTank.CurentVolumeLiters += request.VolumeActualLiters;
                await _unitOfWork.TankRepository.UpdateAsync(oldTank);
                await _unitOfWork.TankRepository.UpdateAsync(newTank);
            }
            else
            {
                tank.CurentVolumeLiters -= wagonReceipt.VolumeActualLiters;

                tank.CurentVolumeLiters += request.VolumeActualLiters;
                await _unitOfWork.TankRepository.UpdateAsync(tank);
            }
            
            if (wagonReceipt != null)
            {
                wagonReceipt.Tank= tank;
                wagonReceipt.Product= product;
                wagonReceipt.WagonNumber= request.WagonNumber;
                wagonReceipt.WaybillNumber= request.WaybillNumber;
                wagonReceipt.VolumeActualLiters= request.VolumeActualLiters;
                wagonReceipt.ReceiptDate= request.ReceiptDate;
                wagonReceipt.VolumeInvoiceLiters= request.VolumeInvoiceLiters;
                wagonReceipt.DiscrepancyLiters = request.VolumeInvoiceLiters = request.VolumeActualLiters;
                var result = await _unitOfWork.WagonReceiptRepository.UpdateAsync(wagonReceipt);
                await _unitOfWork.SaveChangesAsync();
                return new BaseResponse<WagonReceipt> { Status = result.Status, Message = result.Message };
            }
            return new BaseResponse<WagonReceipt> { Status = "Error", Message = "Произошла ошибка" };
        }
    }
}
