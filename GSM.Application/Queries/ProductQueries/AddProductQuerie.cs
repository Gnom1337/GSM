using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.ProductQueries
{
    public class AddProductQuerie : IRequest<BaseResponse<Product>>
    {
        public string Name { get; set; }
    }
}
