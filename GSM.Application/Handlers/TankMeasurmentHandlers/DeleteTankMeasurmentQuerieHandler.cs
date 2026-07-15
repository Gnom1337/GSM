using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.TankMeasurmentHandlers
{
    public class DeleteTankMeasurmentQuerieHandler : IRequestHandler<BaseDeleteQuerie<TankMeasurement>, BaseDeleteResponse>
    {
        public Task<BaseDeleteResponse> Handle(BaseDeleteQuerie<TankMeasurement> request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
