using GSM.Application.Queries.DispatchQueries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DispatchHandlers
{
    public class UpdateDispatchQuerieHandler : IRequestHandler<UpdateDispatchQuerie, BaseGetByIdResponse<Dispatch>>
    {
        public Task<BaseGetByIdResponse<Dispatch>> Handle(UpdateDispatchQuerie request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
