using GSM.Application.Abstractions;
using GSM.Application.Queries.TankQueries;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;

namespace GSM.Application.Handlers.TankHandlers
{
    public class GetAllTanksQuerieHandler : IRequestHandler<GetAllTanksQuerie, List<Tank>> 
    {
        private readonly ITankRepository _tankRepository;
        public GetAllTanksQuerieHandler(ITankRepository tankRepository)
        {
            _tankRepository = tankRepository;
        }

        public async Task<List<Tank>> Handle(GetAllTanksQuerie request, CancellationToken cancellationToken)
        {
            return await _tankRepository.GetAllTanksWithProduct();
        }
    }
}
