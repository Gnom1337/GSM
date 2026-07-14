using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Domain.Models
{
    public class Result <T> where T : class
    {
        public Result(string status, string message, T? data)
        {
            Status= status;
            Message = message;
            Data = data;
        }
        public string Status { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; } 
    }
}
