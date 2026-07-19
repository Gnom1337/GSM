using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.DTOs
{
    public class DashboardDto
    {
        public decimal TotalReceived { get; set; }

        public decimal TotalDispatched { get; set; }

        public decimal TotalLoss { get; set; }

        public decimal CurrentVolume { get; set; }

       // public List<DailyChartDto> DailyStats { get; set; }

       //public List<TankStatusDto> Tanks { get; set; }

       //public List<RecentOperationDto> RecentOperations { get; set; }
    }
}
