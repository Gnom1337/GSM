using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.ProductQueries
{
    public class UpdateProductQuerie : IRequest<BaseGetByIdResponse<Product>>
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public double Density { get; set; }
    }
}
