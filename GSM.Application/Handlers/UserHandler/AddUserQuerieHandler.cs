using GSM.Application.Abstractions;
using GSM.Application.Queries.UserQuerie;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.UserHandler
{
    public class AddUserQuerieHandler : IRequestHandler<AddUserQuerie, BaseResponse<User>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUnitOfWork _unitOfWork;
        public AddUserQuerieHandler(IUserRepository userRepository, IPasswordHasher passwordHasher, IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<User>> Handle(AddUserQuerie request, CancellationToken cancellationToken)
        {
            var passwordHash = _passwordHasher.GenerateHash(request.Password);
            var result = await _userRepository.AddAsync(new User
            {
                FullName = request.FullName,
                Login = request.Login,
                PasswordHash = passwordHash,
                RoleName = request.RoleName,
            });
            await _unitOfWork.SaveChangesAsync();
            if(result.Status == "Success")
            {
                return new BaseResponse<User>
                {
                    Message = result.Message,
                    Status = result.Status,
                };
            }
            return new BaseResponse<User> { Status = "Error", Message = "Произошла ошибка" };
        }
    }
}
