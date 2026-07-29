using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.DTOs
{
    public class TurnoverDto
    {

        public DateOnly Date { get; set; }


        public string ProductName { get; set; }


        public string TankNumber { get; set; }


        public double ReceivedLiters { get; set; }


        public double DispatchedLiters { get; set; }


        public double BalanceChange =>
            ReceivedLiters - DispatchedLiters;

    }
}
