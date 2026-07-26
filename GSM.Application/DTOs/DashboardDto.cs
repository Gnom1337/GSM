using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.DTOs
{
    public class DashboardDto
    {
        public double TotalReceived { get; set; }

        public double TotalDispatched { get; set; }

        public double CurrentVolume { get; set; }

        public List<DailyChartDto>? DailyStats { get; set; }

        public List<TankStatusDto>? Tanks { get; set; }

        public List<RecentOperationDto>? operations { get; set; }
    }
}
