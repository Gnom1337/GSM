using GSM.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Tools.Options
{
    public class PasswordHasher : IPasswordHasher
    {
        public string GenerateHash(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password);
        }

        public bool VerifyHash(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(password, passwordHash);
        }
    }
}
