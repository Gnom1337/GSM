using GSM.Application.Queries.TankQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.TankHandlers
{
    public class UpdateTankQuerieHandler : IRequestHandler<UpdateTankQuerie, BaseGetByIdResponse<Tank>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public UpdateTankQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseGetByIdResponse<Tank>> Handle(UpdateTankQuerie request, CancellationToken cancellationToken)
        {
            var entity = await _unitOfWork.TankRepository.GetById(request.TankId);
            if (entity != null)
            {
                var product = await _unitOfWork.ProductRepository.GetById(request.ProductId);
                if (product != null)
                {
                    entity.CurentVolumeLiters = request.CurentVolumeLiters;
                    entity.CapacityLiters = request.CapacityLiters;
                    entity.TankNumber = request.TankNumber;
                    entity.Product = product;
                    var result = _unitOfWork.TankRepository.UpdateAsync(entity);
                    await _unitOfWork.SaveChangesAsync();
                    return new BaseGetByIdResponse<Tank> { Message = result.Result.Message, Status = result.Result.Status };  
                }
                else
                {
                    return new BaseGetByIdResponse<Tank> { Status = "Error", Message = "Произошла ошибка" };
                }
            }
            else
            {
                return new BaseGetByIdResponse<Tank> { Status = "Error", Message = "Произошла ошибка" };
            }

        }
    }
}
