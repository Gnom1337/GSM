using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Tools.Options
{
    public class JwtOptions
    {
        public string Key { get; set; } = string.Empty;
        public int ExpiresDays { get; set; }
    }
}
