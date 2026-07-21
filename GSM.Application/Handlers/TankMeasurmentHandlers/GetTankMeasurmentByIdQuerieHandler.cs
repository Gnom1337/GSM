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
    public class GetTankMeasurmentByIdQuerieHandler : IRequestHandler<BaseGetByIdQuerie<TankMeasurement>, BaseGetByIdResponse<TankMeasurement>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetTankMeasurmentByIdQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseGetByIdResponse<TankMeasurement>> Handle(BaseGetByIdQuerie<TankMeasurement> request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.TankMeasurementRepository.GetById(request.Id);
            return new BaseGetByIdResponse<TankMeasurement> { entity = result };
        }
    }
}
