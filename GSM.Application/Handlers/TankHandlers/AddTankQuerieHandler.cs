using GSM.Application.Queries.TankQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;

namespace GSM.Application.Handlers.TankHandlers
{
    public class AddTankQuerieHandler : IRequestHandler<AddTankQuerie, BaseResponse<Tank>> 
    {
        private readonly IUnitOfWork _unitOfWork;
        public AddTankQuerieHandler(IUnitOfWork UnitOfWork)
        {
            _unitOfWork = UnitOfWork;
        }
        public async Task<BaseResponse<Tank>> Handle(AddTankQuerie request, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.ProductRepository.GetById(request.ProductId);
            if (product != null)
            {
                var result = await _unitOfWork.TankRepository.AddAsync(new Tank
                {
                    CapacityLiters = request.CapacityLiters,
                    CurentVolumeLiters = request.CurentVolumeLiters,
                    Product = product,
                    TankNumber = request.TankNumber,
                    Density = request.Density,
                });
                await _unitOfWork.SaveChangesAsync();
                return new BaseResponse<Tank>
                {
                    Message = result.Message,
                    Status = result.Status,
                };
            }
            else
            {
                return new BaseResponse<Tank> { Status = "Error", Message = "Произошла ошибка" };
            }
        }
    }
}
