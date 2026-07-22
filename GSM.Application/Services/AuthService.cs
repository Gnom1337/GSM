using GSM.Application.Abstractions;
using GSM.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IPasswordHasher _hasher;
        private readonly IUserRepository _userRepository;
        private readonly IJwtProvider _jwt;
        public AuthService(IPasswordHasher hasher, IUserRepository userRepository, IJwtProvider jwt)
        {
            _hasher = hasher;
            _userRepository = userRepository;
            _jwt = jwt;
        }
        public async Task<string> Login(string userName, string password)
        {
            var user = await _userRepository.GetByUserNameAsync(userName);
            if (user == null)
            {
                return "Не верный логин или пароль";
            }
            var result = _hasher.VerifyHash(password, user.PasswordHash);
            if (result == false)
            {
                return "Не верный логин или пароль";
            }
            var token = _jwt.GenerateToken(user.UserId.ToString(), user.FullName, user.RoleName);
            return token;

        }

    }
}
