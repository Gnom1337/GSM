using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using GSM.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GSM.Infrastructure.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class, new()
    {
        private readonly ApplicationDbContext _dbContext;
        public RepositoryBase(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Result<T>> AddAsync(T entity)
        {
            var result = await _dbContext.AddAsync(entity);
            if (result != null) 
            {
                return new Result<T>("Success", "Запись успешно добавлена", null);
            }
            return new Result<T>("Something is wrong", "Произошла ошибка при добавлении записи", null);
        }

        public Result<T> Delete(T entity)
        {
            if (entity != null)
            {
                _dbContext.Set<T>().Remove(entity);
                return new Result<T>("Success", "Запись успешно удалена", null);
            }
            return new Result<T>("Something is wrong", "Произошла ошибка при удалении записи", null);
        }
        public async Task<T> GetById(int Id)
        {

            return await _dbContext.Set<T>().FindAsync(Id);

        }

        public async Task<Result<T>> UpdateAsync(T entity)
        {

            _dbContext.Entry(entity).State = EntityState.Modified;
            return new Result<T>("Success", $"Запись обновлена", null);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().AsNoTracking().ToListAsync();
        }
    }
}
