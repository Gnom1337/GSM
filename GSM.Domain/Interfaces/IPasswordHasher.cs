using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Domain.Interfaces
{
   public interface IPasswordHasher
    {
        string GenerateHash(string password);
        bool VerifyHash(string password, string passwordHash);
    }
}
