using GSM.Application.Abstractions;
using GSM.Domain.Enums;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Data
{
    public class DataSeeder
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUnitOfWork _unitOfWork;

        public DataSeeder(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher,
            IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _unitOfWork = unitOfWork;
        }

        public async Task SeedAdminAsync()
        {
            var admin = await _userRepository.GetByUserNameAsync("admin");

            if (admin != null)
                return;

            var user = new User
            {
                Login = "admin",
                FullName = "Иванов Иван Иванович",
                PasswordHash = _passwordHasher.GenerateHash("123456"),
                RoleName = RolesEnum.Admin.ToString()
            };

            await _userRepository.AddAsync(user);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
