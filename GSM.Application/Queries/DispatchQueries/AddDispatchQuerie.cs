using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GSM.Application.Queries.DispatchQueries
{
    public class AddDispatchQuerie : IRequest<BaseResponse<Dispatch>>
    {
        public DateOnly DispatchDate { get; set; }
        public int TankId { get; set; }
        public string TruckNumber { get; set; }
        public string DriverName { get; set; }
        public string RecipientOrg { get; set; }
        public double VolumeInvoiceLiters { get; set; }
        public string WaybillNumber { get; set; }
        public string Status { get; set; }
    }
}
