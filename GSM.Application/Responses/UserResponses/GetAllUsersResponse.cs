using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Responses.UserResponses
{
    public class GetAllUsersResponse
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string Login { get; set; }
        public string RoleName { get; set; }
    }
}
