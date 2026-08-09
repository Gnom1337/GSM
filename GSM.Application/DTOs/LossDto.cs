using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.DTOs
{
    public class LossDto
    {

        public DateOnly Date { get; set; }


        public string TankNumber { get; set; }


        public string ProductName { get; set; }


        public double CalculatedVolume { get; set; }


        public double ActualVolume { get; set; }


        public double LossLiters { get; set; }

    }
}
