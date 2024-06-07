using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Infrastructure.IRepositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task<List<T>> GetAll();
        Task<T?> GetById(Guid id);
        Task DeleteEntity(Guid id);
        Task<T> UpdateEntity(T entity);
        Task SaveChanges();
        Task<T> AddEntity(T entity);
        Task<bool> IsExist(Guid id);
        IQueryable<T> GetQueryable();
        Task DeleteEntityByEntity(T entity);
    }
}
