using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DailyBalanceHandlers
{
    public class GetDailyBalanceByIdQuerieHandler : IRequestHandler<BaseGetByIdQuerie<DailyBalance>, BaseGetByIdResponse<DailyBalance>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetDailyBalanceByIdQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseGetByIdResponse<DailyBalance>> Handle(BaseGetByIdQuerie<DailyBalance> request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.DailyBalanceRepository.GetById(request.Id);
            return new BaseGetByIdResponse<DailyBalance> { Status = "", Message = "", entity = result };
        }
    }
}
