using GSM.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.DTOs
{
    public class TankStatusDto
    {
        public int tankId {  get; set; }
        public string number { get; set; }
        public string product {  get; set; }
        public double currentVolume { get; set; }
        public double capacity { get; set; }
        public double percent { get; set; }
    }
}
