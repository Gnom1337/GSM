using GSM.Application.Responses;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries
{
    public class BaseDeleteQuerie : IRequest<BaseDeleteResponse>
    {
        public int Id { get; set; }
    }
}
