using GSM.Application.Queries.ProductQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.ProductHandlers
{
    public class UpdateProductQuerieHandler : IRequestHandler<UpdateProductQuerie, BaseGetByIdResponse<Product>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public UpdateProductQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseGetByIdResponse<Product>> Handle(UpdateProductQuerie request, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.ProductRepository.GetById(request.ProductId);
            if (product != null)
            {
                product.Name = request.Name;
                product.Density = request.Density;
                var result = await _unitOfWork.ProductRepository.UpdateAsync(product);
                await _unitOfWork.SaveChangesAsync();
                return new BaseGetByIdResponse<Product> { Status = result.Status, Message = result.Message };
            }
            return new BaseGetByIdResponse<Product> { Status = "Error", Message = "Произошла ошибка" };
        }
    }
}
