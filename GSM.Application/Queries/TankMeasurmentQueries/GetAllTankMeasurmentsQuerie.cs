using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.TankMeasurmentQueries
{
    public class GetAllTankMeasurmentsQuerie : IRequest<List<TankMeasurement>>
    {
    }
}
