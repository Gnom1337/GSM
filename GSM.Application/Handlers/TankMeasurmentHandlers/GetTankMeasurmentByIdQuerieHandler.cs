using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.TankMeasurmentHandlers
{
    public class GetTankMeasurmentByIdQuerieHandler : IRequestHandler<BaseGetByIdQuerie<TankMeasurement>, BaseGetByIdResponse<TankMeasurement>>
    {
        public Task<BaseGetByIdResponse<TankMeasurement>> Handle(BaseGetByIdQuerie<TankMeasurement> request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
