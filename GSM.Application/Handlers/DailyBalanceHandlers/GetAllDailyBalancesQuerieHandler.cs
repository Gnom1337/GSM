using GSM.Application.Queries.DailyBalanceQueries;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DailyBalanceHandlers
{
    public class GetAllDailyBalancesQuerieHandler : IRequestHandler<GetAllDailyBalancesQuerie, List<DailyBalance>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllDailyBalancesQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<DailyBalance>> Handle(GetAllDailyBalancesQuerie request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.DailyBalanceRepository.GetAllAsync();
        }
    }
}
