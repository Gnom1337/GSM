using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.TankMeasurmentQueries
{
    public class AddTankMeasurmentQuerie : IRequest<BaseResponse<TankMeasurement>>
    {
    }
}
