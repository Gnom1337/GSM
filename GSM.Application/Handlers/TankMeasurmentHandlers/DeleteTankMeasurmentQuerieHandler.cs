using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.TankMeasurmentHandlers
{
    public class DeleteTankMeasurmentQuerieHandler : IRequestHandler<BaseDeleteQuerie<TankMeasurement>, BaseDeleteResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteTankMeasurmentQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseDeleteResponse> Handle(BaseDeleteQuerie<TankMeasurement> request, CancellationToken cancellationToken)
        {
            var entity = await _unitOfWork.TankMeasurementRepository.GetById(request.Id);
            var result = _unitOfWork.TankMeasurementRepository.Delete(entity);
            await _unitOfWork.SaveChangesAsync();
            return new BaseDeleteResponse { Status = result.Status, Message = result.Message };
        }
    }
}
