using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GSM.Domain.Models
{
    public class Tank
    {
        [Key]
        public int TankId { get; set; }
        public string TankNumber { get; set;  }
        public double CapacityLiters { get; set;  }
        [ForeignKey(nameof(ProductId))]
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public double CurentVolumeLiters { get; set; } = 0;

    }
}
