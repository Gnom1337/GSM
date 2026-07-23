using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.UserQuerie
{
    public class UpdateUserQuerie : IRequest<BaseResponse<User>>
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string Login { get; set; }
        public string? Password { get; set; }
        public string RoleName { get; set; }
    }
}
