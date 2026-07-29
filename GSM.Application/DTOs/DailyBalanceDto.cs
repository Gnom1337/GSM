using GSM.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.DTOs
{
    public class DailyBalanceDto
    {
        public DateOnly Date { get; set; }

        public int TankId { get; set; }

        public string TankNumber { get; set; }

        public string ProductName { get; set; }


        public double OpeningVolume { get; set; }


        public double TotalReceived { get; set; }


        public double TotalDispatched { get; set; }


        public double ClosingVolumeCalculated { get; set; }


        public double ClosingVolumeActual { get; set; }


        public double LossLiters { get; set; }
    }
}
