using GSM.Application.Queries.TankMeasurmentQueries;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.TankMeasurmentHandlers
{
    public class GetAllTankMeasurmentsQuerieHandler : IRequestHandler<GetAllTankMeasurmentsQuerie, List<TankMeasurement>>
    {
        public Task<List<TankMeasurement>> Handle(GetAllTankMeasurmentsQuerie request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
