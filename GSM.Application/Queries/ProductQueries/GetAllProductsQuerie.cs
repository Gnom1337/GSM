using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.ProductQueries
{
    public class GetAllProductsQuerie : IRequest<List<Product>>
    {

    }
}
