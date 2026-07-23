using GSM.Application.Abstractions;
using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.UserHandler
{
    public class GetUserByIdQuerieHandler : IRequestHandler<BaseGetByIdQuerie<User>, BaseGetByIdResponse<User>>
    {
        private readonly IUserRepository _userRepository;
        public GetUserByIdQuerieHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<BaseGetByIdResponse<User>> Handle(BaseGetByIdQuerie<User> request, CancellationToken cancellationToken)
        {
            var entity = await _userRepository.GetById(request.Id);
            if (entity != null)
            {
                return new BaseGetByIdResponse<User> { Message = "Данные получены", entity = entity };
            }
            return new BaseGetByIdResponse<User> { Message = "Произошла ошибка" };
        }
    }
}
