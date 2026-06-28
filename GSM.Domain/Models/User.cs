using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GSM.Domain.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set;  }
        public string FullName { get; set;  }
        public string Login { get; set; }
        public string PasswordHash {  get; set; }
        public string RoleName { get; set;  }
    }
}
