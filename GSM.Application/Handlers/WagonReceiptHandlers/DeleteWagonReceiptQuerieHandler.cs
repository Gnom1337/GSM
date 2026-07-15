using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.WagonReceiptHandlers
{
    public class DeleteWagonReceiptQuerieHandler : IRequestHandler<BaseDeleteQuerie<WagonReceipt>, BaseDeleteResponse>
    {
        public Task<BaseDeleteResponse> Handle(BaseDeleteQuerie<WagonReceipt> request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
