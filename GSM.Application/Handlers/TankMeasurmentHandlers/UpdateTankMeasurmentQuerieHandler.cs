using GSM.Application.Queries.TankMeasurmentQueries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.TankMeasurmentHandlers
{
    public class UpdateTankMeasurmentQuerieHandler : IRequestHandler<UpdateTankMeasurmentQuerie, BaseGetByIdResponse<TankMeasurement>>
    {
        public Task<BaseGetByIdResponse<TankMeasurement>> Handle(UpdateTankMeasurmentQuerie request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
