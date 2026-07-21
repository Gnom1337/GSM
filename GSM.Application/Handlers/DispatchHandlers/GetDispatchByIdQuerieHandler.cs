using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DispatchHandlers
{
    public class GetDispatchByIdQuerieHandler : IRequestHandler<BaseGetByIdQuerie<Dispatch>, BaseGetByIdResponse<Dispatch>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetDispatchByIdQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseGetByIdResponse<Dispatch>> Handle(BaseGetByIdQuerie<Dispatch> request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.DispatchRepository.GetById(request.Id);
            return new BaseGetByIdResponse<Dispatch> { entity = result };
        }
    }
}
