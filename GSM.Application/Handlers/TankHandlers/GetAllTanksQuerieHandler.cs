using GSM.Application.Queries.TankQueries;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;

namespace GSM.Application.Handlers.TankHandlers
{
    public class GetAllTanksQuerieHandler : IRequestHandler<GetAllTanksQuerie, List<Tank>> 
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllTanksQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Tank>> Handle(GetAllTanksQuerie request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.TankRepository.GetAllAsync();
        }
    }
}
