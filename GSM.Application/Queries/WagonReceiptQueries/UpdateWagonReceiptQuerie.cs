using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GSM.Application.Queries.WagonReceiptQueries
{
    public class UpdateWagonReceiptQuerie : IRequest<BaseResponse<WagonReceipt>>
    {
        public int WagonReceiptId { get; set; }
        public string WagonNumber { get; set; }
        public DateOnly ReceiptDate { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int TankId { get; set; }
        public Tank Tank { get; set; }
        public double VolumeInvoiceLiters { get; set; }
        public double VolumeActualLiters { get; set; }
        public double DiscrepancyLiters { get; set; }
        public string WaybillNumber { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
