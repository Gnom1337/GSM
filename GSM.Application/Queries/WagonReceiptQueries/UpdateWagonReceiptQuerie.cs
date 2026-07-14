using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.WagonReceiptQueries
{
    public class UpdateWagonReceiptQuerie : IRequest<BaseGetByIdResponse<WagonReceipt>>
    {
    }
}
