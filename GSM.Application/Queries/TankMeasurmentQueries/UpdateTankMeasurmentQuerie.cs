using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GSM.Application.Queries.TankMeasurmentQueries
{
    public class UpdateTankMeasurmentQuerie : IRequest<BaseResponse<TankMeasurement>>
    {
        public int TankMeasurementsId { get; set; }
        public int TankId { get; set; }
        public Tank Tank { get; set; }
        public DateTime MeasuredAt { get; set; }
        public double VolumeLiters { get; set; }
        public string? Note { get; set; }
        public double FuelHeight { get; set; }
        public string Status { get; set; }
    }
}
