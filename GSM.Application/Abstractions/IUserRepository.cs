using GSM.Application.Responses.UserResponses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Abstractions
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task<User> GetByUserNameAsync(string userName);
        Task<List<GetAllUsersResponse>> GetAllUsersAsync();

    }
}
