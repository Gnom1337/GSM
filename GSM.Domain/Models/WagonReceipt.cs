using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Text;

namespace GSM.Domain.Models
{
    public class WagonReceipt
    {
        public WagonReceipt() => DiscrepancyLiters = VolumeInvoiceLiters - VolumeActualLiters;
        [Key]
        public int WagonReceiptId {  get; set; }
        public string WagonNumber { get; set; }
        public DateOnly ReceiptDate { get; set;  }
        [ForeignKey(nameof(ProductId))]
        public int ProductId { get; set; }
        public Product Product { get; set; }
        [ForeignKey(nameof(TankId))]
        public int TankId { get; set; }
        public Tank Tank { get; set; }
        public double VolumeInvoiceLiters { get; set; }
        public double VolumeActualLiters { get; set; }
        public double DiscrepancyLiters { get; set; } 
        public string WaybillNumber { get; set; }
        [ForeignKey(nameof(UserId))]
        public int UserId { get; set; }
        public User User { get; set; }
        public TimeOnly CreatedAt { get; set; }
    }
}
