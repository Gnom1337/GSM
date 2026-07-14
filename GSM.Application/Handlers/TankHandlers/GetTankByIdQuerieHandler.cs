using GSM.Application.Queries;
using GSM.Application.Queries.TankQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;

namespace GSM.Application.Handlers.TankHandlers
{
    public class GetTankByIdQuerieHandler : IRequestHandler<BaseGetByIdQuerie<Tank>, BaseGetByIdResponse<Tank>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetTankByIdQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseGetByIdResponse<Tank>> Handle(BaseGetByIdQuerie<Tank> request, CancellationToken cancellationToken)
        {
            var entity = await _unitOfWork.TankRepository.GetById(request.Id);
            if (entity != null) 
            {
                return new BaseGetByIdResponse<Tank> { Message = "", Status = "", entity = entity};
            }
            return new BaseGetByIdResponse<Tank> { Status = "Error", Message = "Произошла ошибка" };
        }
    }
}
