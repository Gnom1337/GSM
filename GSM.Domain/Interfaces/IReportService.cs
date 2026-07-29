using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Domain.Interfaces
{
    public interface IReportService
    {
        byte[] GenerateDailyBalance(DateOnly date, int? tankId);

        byte[] GenerateTurnover(
            DateOnly from,
            DateOnly to,
            int? productId);


        byte[] GenerateLoss(
            DateOnly from,
            DateOnly to,
            int? tankId);
    }
}
