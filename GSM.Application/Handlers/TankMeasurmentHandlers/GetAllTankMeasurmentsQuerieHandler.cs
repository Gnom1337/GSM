using GSM.Application.Queries.TankMeasurmentQueries;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.TankMeasurmentHandlers
{
    public class GetAllTankMeasurmentsQuerieHandler : IRequestHandler<GetAllTankMeasurmentsQuerie, List<TankMeasurement>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllTankMeasurmentsQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<TankMeasurement>> Handle(GetAllTankMeasurmentsQuerie request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.TankMeasurementRepository.GetAllAsync(x => x.TankId == request.TankId, x=>x.User);
        }
    }
}
