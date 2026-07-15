using GSM.Application.Responses;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries
{
    public class BaseDeleteQuerie<T> : IRequest<BaseDeleteResponse>
    {
        public int Id { get; set; }
    }
}
