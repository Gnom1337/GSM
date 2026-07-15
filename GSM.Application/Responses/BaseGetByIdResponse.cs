using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Responses
{
    public class BaseGetByIdResponse<T> where T : class
    {
        public string Message { get; set; } = string.Empty;
        public T? entity { get; set; }
    }
}
