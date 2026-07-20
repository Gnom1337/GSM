using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.ProductHandlers
{
    public class GetProductByIdQuerieHandler : IRequestHandler<BaseGetByIdQuerie<Product>, BaseGetByIdResponse<Product>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetProductByIdQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseGetByIdResponse<Product>> Handle(BaseGetByIdQuerie<Product> request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.ProductRepository.GetById(request.Id);
            if (result != null) 
            { 
                return new BaseGetByIdResponse<Product> { Message= "Данные получены", entity = result };
            }
            return new BaseGetByIdResponse<Product> { Message = "Произошла ошибка" };
        }
    }
}
