using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;

namespace GSM.Application.Queries.TankQueries
{
    public class UpdateTankQuerie : IRequest<BaseGetByIdResponse<Tank>>
    {
        public int TankId {  get; set; }
        public string TankNumber { get; set; }
        public double CapacityLiters { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public double CurentVolumeLiters { get; set; }
    }
}
