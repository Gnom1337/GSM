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
    public class AddProductQuerieHandler : IRequestHandler<AddProductQuerie, BaseGetByIdResponse<Product>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public AddProductQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseGetByIdResponse<Product>> Handle(AddProductQuerie request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.ProductRepository.AddAsync(new Product
            {
                 Density = request.Density,
                 Name = request.Name,
            });
            await _unitOfWork.SaveChangesAsync();
            return new BaseGetByIdResponse<Product> { Status = result.Status, Message = result.Message };
        }
    }
}
