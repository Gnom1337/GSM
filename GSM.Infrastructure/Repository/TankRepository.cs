using GSM.Application.Abstractions;
using GSM.Domain.Models;
using GSM.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Repository
{
    public class TankRepository : RepositoryBase<Tank>, ITankRepository
    {
        private readonly ApplicationDbContext _context;
        public TankRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _context = dbContext;
        }

        public async Task<List<Tank>> GetAllTanksWithProduct()
        {
            return await _context.Tanks.Include(t => t.Product).AsNoTracking().ToListAsync();  
        }
    }
}
