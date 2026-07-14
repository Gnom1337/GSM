using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;

namespace GSM.Application.Queries.TankQueries
{
    public class AddTankQuerie : IRequest<BaseGetByIdResponse<Tank>>
    {
        public string TankNumber { get; set; }
        public double CapacityLiters { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public double CurentVolumeLiters { get; set; }
    }
}
