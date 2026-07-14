using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GSM.Application.Queries.DailyBalanceQueries
{
    public class UpdateDailyBalanceQuerie : IRequest<BaseGetByIdResponse<DailyBalance>>
    {
        public int DailyBalanceId { get; set; }
        public DateOnly BalanceDate { get; set; }
        public int TankId { get; set; }
        public Tank Tank { get; set; }
        public decimal OpeningVolume { get; set; }
        public decimal TotalReceived { get; set; }
        public decimal TotalDispatched { get; set; }
        public decimal ClosingVolumeCalculated { get; set; }
        public decimal ClosingVolumeActual { get; set; }
        public decimal LossLiters { get; set; }
    }
}
