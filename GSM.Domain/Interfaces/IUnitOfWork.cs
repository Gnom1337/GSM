using GSM.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepositoryBase<Tank> TankRepository { get; }
        IRepositoryBase<Product> ProductRepository { get; }
        IRepositoryBase<DailyBalance> DailyBalanceRepository { get; }
        IRepositoryBase<TankMeasurement> TankMeasurementRepository { get; }
        IRepositoryBase<WagonReceipt> WagonReceiptRepository { get; }
        IRepositoryBase<Dispatch> DispatchRepository { get; }
        Task<bool> SaveChangesAsync();
    }
}
