using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Responses
{
    public class BaseDeleteResponse
    {
        public string Status { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
