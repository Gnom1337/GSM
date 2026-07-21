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
    public class DeleteDispatchQuerieHandler : IRequestHandler<BaseDeleteQuerie<Dispatch>, BaseDeleteResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteDispatchQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseDeleteResponse> Handle(BaseDeleteQuerie<Dispatch> request, CancellationToken cancellationToken)
        {
            var entity = await _unitOfWork.DispatchRepository.GetById(request.Id);
            var result = _unitOfWork.DispatchRepository.Delete(entity);
            await _unitOfWork.SaveChangesAsync();
            return new BaseDeleteResponse { Status = result.Status, Message = result.Message };
        }
    }
}
