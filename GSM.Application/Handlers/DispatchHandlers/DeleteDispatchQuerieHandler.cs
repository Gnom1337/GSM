using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DispatchHandlers
{
    public class DeleteDispatchQuerieHandler : IRequestHandler<BaseGetByIdQuerie<Dispatch>, BaseGetByIdResponse<Dispatch>>
    {
        public Task<BaseGetByIdResponse<Dispatch>> Handle(BaseGetByIdQuerie<Dispatch> request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
