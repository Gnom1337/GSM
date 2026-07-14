using GSM.Application.Queries.WagonReceiptQueries;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.WagonReceiptHandlers
{
    public class GetAllWagonReceiptsQuerieHandler : IRequestHandler<GetAllWagonReceiptsQuerie, List<WagonReceipt>>
    {
        public Task<List<WagonReceipt>> Handle(GetAllWagonReceiptsQuerie request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
