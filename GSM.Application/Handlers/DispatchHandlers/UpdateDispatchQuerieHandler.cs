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
    public class UpdateDispatchQuerieHandler : IRequestHandler<UpdateDispatchQuerie, BaseResponse<Dispatch>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public UpdateDispatchQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<Dispatch>> Handle(UpdateDispatchQuerie request, CancellationToken cancellationToken)
        {
            var dispatch = await _unitOfWork.DispatchRepository.GetById(request.DispatchId);
            var tank = await _unitOfWork.TankRepository.GetById(request.TankId);


            //USER..........................


            if (dispatch != null)
            {
                dispatch.DispatchDate = request.DispatchDate;
                dispatch.CreatedAt = request.CreatedAt;
                dispatch.User= request.User;
                dispatch.Tank = tank;
                dispatch.DriverName = request.DriverName;
                dispatch.RecipientOrg = request.RecipientOrg;
                dispatch.WaybillNumber = request.WaybillNumber;
                dispatch.VolumeInvoiceLiters = request.VolumeInvoiceLiters;
                dispatch.TruckNumber = request.TruckNumber;
                var result = await _unitOfWork.DispatchRepository.UpdateAsync(dispatch);
                await _unitOfWork.SaveChangesAsync();
                return new BaseResponse<Dispatch> { Status = result.Status, Message = result.Message };
            }
            return new BaseResponse<Dispatch> { Status = "Error", Message = "Произошла ошибка" };
        }
    }
}
