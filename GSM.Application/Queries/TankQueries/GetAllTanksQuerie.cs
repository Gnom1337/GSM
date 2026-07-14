using GSM.Domain.Models;
using MediatR;

namespace GSM.Application.Queries.TankQueries
{
    public class GetAllTanksQuerie : IRequest<List<Tank>>
    {

    }
}
