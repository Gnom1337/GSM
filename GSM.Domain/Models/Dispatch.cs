using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Text;

namespace GSM.Domain.Models
{
    public class Dispatch
    {
        [Key]
        public int DispatchId {  get; set; }
        public DateOnly DispatchDate { get; set;  }
        [ForeignKey(nameof(TankId))]
        public int TankId { get; set; }
        public Tank Tank { get; set; }
        public string TruckNumber { get; set; }
        public string DriverName { get; set; }
        public string RecipientOrg { get; set;  }
        public double VolumeInvoiceLiters {  get; set; }
        public string WaybillNumber { get; set; }
        [ForeignKey(nameof(UserId))]
        public int UserId { get; set;  }
        public User User { get; set; }
        public TimeOnly CreatedAt { get; set;  }
    }
}
