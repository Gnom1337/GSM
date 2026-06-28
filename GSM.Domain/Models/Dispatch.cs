using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;
using System.Text;

namespace GSM.Domain.Models
{
    public class Dispatch
    {
        [Key]
        public int DispatchId {  get; set; }
        public DateOnly DispatchDate { get; set;  }
        public int TankId { get; set; }
        public Tank Tank { get; set; }
        public string TruckNumber { get; set; }
        public string DriverName { get; set; }
        public string RecipientOrg { get; set;  }
        public double VolumeInvoiceLiters {  get; set; }
        public string WaybillNumber { get; set; }
        public int UserId { get; set;  }
        public User User { get; set; }
        public TimeOnly CreatedAt { get; set;  }
    }
}
