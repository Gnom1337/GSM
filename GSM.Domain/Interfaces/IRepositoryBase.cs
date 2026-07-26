using GSM.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace GSM.Domain.Interfaces
{
    public interface IRepositoryBase <T> where T : class
    {
        Task<Result<T>> AddAsync(T entity);
        Task<Result<T>> UpdateAsync(T entity);
        Result<T> Delete(T entity);
        Task<T> GetById(int Id);
        Task<List<T>> GetAllAsync();
        Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? predicate, params Expression<Func<T, object>>[] includeProperties);
        Task<double> GetSumAsync(Expression<Func<T, bool>>? predicate = null, Expression<Func<T, double>>? selector = null);
    }
}
