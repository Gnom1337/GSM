using GSM.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Domain.Interfaces
{
    public interface IAuth
    {
        Task Login(string username, string password);
    }
}
