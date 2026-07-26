using GSM.Application.Queries.WagonReceiptQueries;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Handlers.WagonReceiptHandlers
{
    public class GetAllWagonReceiptsQuerieHandler : IRequestHandler<GetAllWagonReceiptsQuerie, List<WagonReceipt>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllWagonReceiptsQuerieHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<WagonReceipt>> Handle(GetAllWagonReceiptsQuerie request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.WagonReceiptRepository.GetAllAsync(null, x=>x.Product, x=>x.Tank);
        }
    }
}
