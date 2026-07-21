using GSM.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Domain.Interfaces
{
    public interface IUserService <T> where T : class
    {
        Task<User> GetById(int Id);
        Task AddUserAsync(T request);
        Task EditUserAsync(int Id, T request);
        Task DeleteUserAsync(int Id);
        Task<string> CreatePasswordHash(string password);
    }
}
