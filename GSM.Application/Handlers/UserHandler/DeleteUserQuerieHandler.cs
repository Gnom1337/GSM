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
    public class DeleteUserQuerieHandler : IRequestHandler<BaseDeleteQuerie<User>, BaseDeleteResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        public DeleteUserQuerieHandler(IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseDeleteResponse> Handle(BaseDeleteQuerie<User> request, CancellationToken cancellationToken)
        {
            var entity = await _userRepository.GetById(request.Id);
            var result = _userRepository.Delete(entity);
            await _unitOfWork.SaveChangesAsync();
            return new BaseDeleteResponse { Message = result.Message, Status = result.Status };
        }
    }
}
