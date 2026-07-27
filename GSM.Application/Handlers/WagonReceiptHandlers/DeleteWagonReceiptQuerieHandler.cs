using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.WagonReceiptHandlers
{
    public class DeleteWagonReceiptQuerieHandler : IRequestHandler<BaseDeleteQuerie<WagonReceipt>, BaseDeleteResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteWagonReceiptQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseDeleteResponse> Handle(BaseDeleteQuerie<WagonReceipt> request, CancellationToken cancellationToken)
        {
            var wagonReceipt = await _unitOfWork.WagonReceiptRepository.GetById(request.Id);
            if (wagonReceipt != null)
            {
                var tank = await _unitOfWork.TankRepository.GetById(wagonReceipt.TankId);
                tank.CurentVolumeLiters -= wagonReceipt.VolumeActualLiters;
                var result = _unitOfWork.WagonReceiptRepository.Delete(wagonReceipt);
                await _unitOfWork.SaveChangesAsync();
                return new BaseDeleteResponse { Status = "Success", Message = "Запись успешно удалена" };
            }
            return new BaseDeleteResponse { Status = "Error", Message = "Произошла ошибка" };
        }
    }
}
