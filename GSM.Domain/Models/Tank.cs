using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GSM.Domain.Models
{
    public class Tank
    {
        [Key]
        public int TankId { get; set; }
        public string TankNumber { get; set;  }
        public double CapacityLiters { get; set;  }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public double CurentVolumeLiters { get; set; }

    }
}
