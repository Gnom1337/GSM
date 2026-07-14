using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.WagonReceiptHandlers
{
    public class DeleteWagonReceiptQuerieHandler : IRequestHandler<BaseGetByIdQuerie<WagonReceipt>, BaseGetByIdResponse<WagonReceipt>>
    {
        public Task<BaseGetByIdResponse<WagonReceipt>> Handle(BaseGetByIdQuerie<WagonReceipt> request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
