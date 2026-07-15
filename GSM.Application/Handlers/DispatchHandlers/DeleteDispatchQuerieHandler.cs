using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DispatchHandlers
{
    public class DeleteDispatchQuerieHandler : IRequestHandler<BaseDeleteQuerie<Dispatch>, BaseDeleteResponse>
    {
        public Task<BaseDeleteResponse> Handle(BaseDeleteQuerie<Dispatch> request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
