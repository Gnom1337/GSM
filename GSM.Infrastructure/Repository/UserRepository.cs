using GSM.Application.Abstractions;
using GSM.Application.Queries.UserQuerie;
using GSM.Application.Responses.UserResponses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using GSM.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Repository
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _context = dbContext;
        }

        public async Task<List<GetAllUsersResponse>> GetAllUsersAsync()
        {
            return await _context.Users
                .Select(c => new GetAllUsersResponse
                {
                    UserId = c.UserId,
                    FullName = c.FullName,
                    Login = c.Login,
                    RoleName = c.RoleName
                })
                .ToListAsync();
        }

        public async Task<User> GetByUserNameAsync(string userName)
        {
            return await _context.Users.AsNoTracking().FirstOrDefaultAsync(c => c.Login == userName);
        }
        
    }
}
