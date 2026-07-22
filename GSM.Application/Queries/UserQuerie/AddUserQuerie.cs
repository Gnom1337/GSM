using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.UserQuerie
{
    public class AddUserQuerie : IRequest<BaseResponse<User>>
    {
        public string FullName { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; }
    }
}
