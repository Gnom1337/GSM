using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Domain.Interfaces
{
    public interface IJwtProvider
    {
        string GenerateToken(string userId, string fullName, string role);
    }
}
