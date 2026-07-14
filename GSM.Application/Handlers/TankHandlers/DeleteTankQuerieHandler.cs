using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;

namespace GSM.Application.Handlers.TankHandlers
{
    public class DeleteTankQuerieHandler : IRequestHandler<BaseDeleteQuerie, BaseDeleteResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteTankQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseDeleteResponse> Handle(BaseDeleteQuerie request, CancellationToken cancellationToken)
        {
            var entity = await _unitOfWork.TankRepository.GetById(request.Id);
            var result =  _unitOfWork.TankRepository.Delete(entity);
            await _unitOfWork.SaveChangesAsync();
            return new BaseDeleteResponse { Message = result.Message, Status = result.Status };
        }
    }
}
