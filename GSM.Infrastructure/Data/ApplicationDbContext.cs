using GSM.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder options)
       => options.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=GSMdb;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False;Command Timeout=30");
        public DbSet <User> Users { get; set; }
        public DbSet <Product> Products { get; set; }
        public DbSet <Tank> Tanks { get; set; }
        public DbSet <WagonReceipt> WagonReceipts { get; set; }
        public DbSet <TankMeasurement> TankMeasurements { get; set; }
        public DbSet<Dispatch> Dispatches { get; set; }
        public DbSet<DailyBalance> DailyBalances { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }

    }
}
