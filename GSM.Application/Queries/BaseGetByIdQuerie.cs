using GSM.Application.Responses;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries
{
    public class BaseGetByIdQuerie<T> : IRequest<BaseGetByIdResponse<T>>
    where T : class
    {
        public int Id { get; set; }
    }
}
