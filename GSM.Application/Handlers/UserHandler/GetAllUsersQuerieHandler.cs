using GSM.Application.Abstractions;
using GSM.Application.Queries.UserQuerie;
using GSM.Application.Responses.UserResponses;
using GSM.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.UserHandler
{
    public class GetAllUsersQuerieHandler : IRequestHandler<GetAllUsersQuerie, List<GetAllUsersResponse>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _userRepository;
        public GetAllUsersQuerieHandler(IUnitOfWork unitOfWork, IUserRepository userRepository)
        {
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
        }

        public async Task<List<GetAllUsersResponse>> Handle(GetAllUsersQuerie request, CancellationToken cancellationToken)
        {
            return await _userRepository.GetAllUsersAsync();
        }
    }
}
