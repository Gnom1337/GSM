using GSM.Application.Queries.WagonReceiptQueries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.WagonReceiptHandlers
{
    public class AddWagonReceiptQuerieHandler : IRequestHandler<AddWagonReceiptQuerie, BaseResponse<WagonReceipt>>
    {
        public Task<BaseResponse<WagonReceipt>> Handle(AddWagonReceiptQuerie request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
