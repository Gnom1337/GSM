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
    public class UpdateUserQuerieHandler : IRequestHandler<UpdateUserQuerie, BaseResponse<User>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordHasher _passwordHasher;
        public UpdateUserQuerieHandler(IUserRepository userRepository, IUnitOfWork unitOfWork, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
        }

        public async Task<BaseResponse<User>> Handle(UpdateUserQuerie request, CancellationToken cancellationToken)
        {
            var entity = await _userRepository.GetById(request.UserId);
            if (entity != null)
            {
                if (request.Password != null) 
                { 
                    entity.FullName = request.FullName;
                    entity.RoleName = request.RoleName;
                    entity.Login = request.Login;
                    entity.PasswordHash = _passwordHasher.GenerateHash(request.Password);
                }
                else
                {
                    entity.FullName = request.FullName;
                    entity.RoleName = request.RoleName;
                    entity.Login = request.Login;
                }
                    var result = await _userRepository.UpdateAsync(entity);
                    await _unitOfWork.SaveChangesAsync();
                    return new BaseResponse<User> { Message = result.Message, Status = result.Status };
            }
            else
            {
                return new BaseResponse<User> { Status = "Error", Message = "Произошла ошибка" };
            }
        }
    }
}
