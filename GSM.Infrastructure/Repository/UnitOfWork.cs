using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using GSM.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Repository
{
    public class UnitOfWork(ApplicationDbContext context) : IUnitOfWork
    {
        public IRepositoryBase<Tank> TankRepository
        {
            get { return field ??= new RepositoryBase<Tank>(context); }
        }

        public IRepositoryBase<Product> ProductRepository
        {
            get { return field ??= new RepositoryBase<Product>(context); }
        }

        public IRepositoryBase<DailyBalance> DailyBalanceRepository 
        {
            get { return field ??= new RepositoryBase<DailyBalance>(context); }
        }

        public IRepositoryBase<TankMeasurement> TankMeasurementRepository
        {
            get { return field ??= new RepositoryBase<TankMeasurement>(context); }
        }

        public IRepositoryBase<WagonReceipt> WagonReceiptRepository
        {
            get { return field ??= new RepositoryBase<WagonReceipt>(context); }
        }

        public IRepositoryBase<Dispatch> DispatchRepository
        {
            get { return field ??= new RepositoryBase<Dispatch>(context); }
        }

        public void Dispose()
        {
            if (context == null)
            {
                return;
            }
            context.Dispose();
        }

        public async Task<bool> SaveChangesAsync()
        {
            bool isSuccess = await context.SaveChangesAsync() > 0;
            return isSuccess;
        }
    }
}
