using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GSM.Application.Queries.TankMeasurmentQueries
{
    public class AddTankMeasurmentQuerie : IRequest<BaseResponse<TankMeasurement>>
    {
        public int TankId { get; set; }
        public double VolumeLiters { get; set; }
        public int UserId { get; set; }
        public string? Note { get; set; }
    }
}
