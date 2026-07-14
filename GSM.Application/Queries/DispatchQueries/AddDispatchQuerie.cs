using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.DispatchQueries
{
    public class AddDispatchQuerie : IRequest<BaseGetByIdResponse<Dispatch>>
    {
    }
}
