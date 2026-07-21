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
    public class GetWagonReceiptByIdQuerieHandler : IRequestHandler<BaseGetByIdQuerie<WagonReceipt>, BaseGetByIdResponse<WagonReceipt>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetWagonReceiptByIdQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseGetByIdResponse<WagonReceipt>> Handle(BaseGetByIdQuerie<WagonReceipt> request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.WagonReceiptRepository.GetById(request.Id);
            if (result != null)
            {
                return new BaseGetByIdResponse<WagonReceipt> { Message = "Данные получены", entity = result };
            }
            return new BaseGetByIdResponse<WagonReceipt> { Message = "Произошла ошибка" };
        }
    }
}
