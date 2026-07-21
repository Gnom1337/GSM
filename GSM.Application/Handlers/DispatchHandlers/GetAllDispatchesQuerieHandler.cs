using GSM.Application.Queries.DispatchQueries;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DispatchHandlers
{
    public class GetAllDispatchesQuerieHandler : IRequestHandler<GetAllDispatchesQuerie, List<Dispatch>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllDispatchesQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Dispatch>> Handle(GetAllDispatchesQuerie request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.DispatchRepository.GetAllAsync();
        }
    }
}
