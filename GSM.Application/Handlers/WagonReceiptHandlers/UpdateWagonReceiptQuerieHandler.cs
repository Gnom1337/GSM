using GSM.Application.Queries.WagonReceiptQueries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.WagonReceiptHandlers
{
    public class UpdateWagonReceiptQuerieHandler : IRequestHandler<UpdateWagonReceiptQuerie, BaseResponse<WagonReceipt>>
    {
        public Task<BaseResponse<WagonReceipt>> Handle(UpdateWagonReceiptQuerie request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
