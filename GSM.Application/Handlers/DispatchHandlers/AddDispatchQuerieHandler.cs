using GSM.Application.Queries.DispatchQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.DispatchHandlers
{
    public class AddDispatchQuerieHandler : IRequestHandler<AddDispatchQuerie, BaseResponse<Dispatch>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public AddDispatchQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<Dispatch>> Handle(AddDispatchQuerie request, CancellationToken cancellationToken)
        {
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);
            if (tank != null)
            {
                var result = await _unitOfWork.DispatchRepository.AddAsync(new Dispatch
                {
                     DispatchDate = request.DispatchDate,
                     CreatedAt = DateTime.UtcNow,
                     DriverName = request.DriverName,
                     RecipientOrg = request.RecipientOrg,
                     TruckNumber = request.TruckNumber,
                     VolumeInvoiceLiters = request.VolumeInvoiceLiters,
                     WaybillNumber = request.WaybillNumber,
                     Tank = request.Tank,
                     User = request.User,
                             
                     
                });
                await _unitOfWork.SaveChangesAsync();
                return new BaseResponse<Dispatch> { Status = result.Status, Message = result.Message };
            }
            else
            {
                return new BaseResponse<Dispatch> { Status = "Error", Message = "Произошла ошибка" };
            }
        }
    }
}
