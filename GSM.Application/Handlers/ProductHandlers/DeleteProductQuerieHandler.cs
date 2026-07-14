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
    public class DeleteProductQuerieHandler : IRequestHandler<BaseDeleteQuerie, BaseDeleteResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteProductQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseDeleteResponse> Handle(BaseDeleteQuerie request, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.ProductRepository.GetById(request.Id);
            if (product != null)
            {
                var result = _unitOfWork.ProductRepository.Delete(product);
                await _unitOfWork.SaveChangesAsync();
                return new BaseDeleteResponse { Status = "Success", Message = "Запись успешно удалена" };
            }
            return new BaseDeleteResponse { Status = "Error", Message = "Произошла ошибка" };
        }
    }
}
