using GSM.Application.Queries.ProductQueries;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.ProductHandlers
{
    public class GetAllProductsQuerieHandler : IRequestHandler<GetAllProductsQuerie, List<Product>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllProductsQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Product>> Handle(GetAllProductsQuerie request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.ProductRepository.GetAllAsync();
        }
    }
}
