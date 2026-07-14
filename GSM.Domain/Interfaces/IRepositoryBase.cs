using GSM.Domain.Models;
using System;
using System.Collections.Generic;
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

    }
}
