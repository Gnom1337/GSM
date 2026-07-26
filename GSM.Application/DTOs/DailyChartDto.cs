using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.DTOs
{
    public class DailyChartDto
    {
        public DateTime date {  get; set; }
        public double received { get; set; }
        public double dispatched { get; set; }
    }
}
