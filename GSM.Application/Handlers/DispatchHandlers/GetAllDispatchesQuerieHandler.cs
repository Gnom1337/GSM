using GSM.Application.Queries.DispatchQueries;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DispatchHandlers
{
    public class GetAllDispatchesQuerieHandler : IRequestHandler<GetAllDispatchesQuerie, List<Dispatch>>
    {
        public Task<List<Dispatch>> Handle(GetAllDispatchesQuerie request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
