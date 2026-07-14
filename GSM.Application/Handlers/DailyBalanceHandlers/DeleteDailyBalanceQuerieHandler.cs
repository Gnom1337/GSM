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
    public class DeleteDailyBalanceQuerieHandler : IRequestHandler<BaseDeleteQuerie, BaseDeleteResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteDailyBalanceQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<BaseDeleteResponse> Handle(BaseDeleteQuerie request, CancellationToken cancellationToken)
        {
            var entity = await _unitOfWork.DailyBalanceRepository.GetById(request.Id);
            var result =  _unitOfWork.DailyBalanceRepository.Delete(entity);
            await _unitOfWork.SaveChangesAsync();
            return new BaseDeleteResponse { Status = result.Status, Message = result.Message };
        }
    }
}
