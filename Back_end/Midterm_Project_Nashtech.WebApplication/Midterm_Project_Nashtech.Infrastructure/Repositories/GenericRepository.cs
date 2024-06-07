using Microsoft.EntityFrameworkCore;
using Midterm_Project_Nashtech.Infrastructure.Data;
using Midterm_Project_Nashtech.Infrastructure.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Infrastructure.Repositories
{   
    
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly DataContext _context;
        public GenericRepository(DataContext context) {
            _context = context;
        }

        public async Task<T> AddEntity(T entity)
        {   
            await _context.Set<T>().AddAsync(entity);
            await SaveChanges();
            return entity;
        }

        public async Task DeleteEntity(Guid id)
        {
            _context.Set<T>().Remove(await GetById(id));
            await SaveChanges();
        }
        public async Task DeleteEntityByEntity(T entity)
        {
            _context.Set<T>().Remove(entity);
            await SaveChanges();
        }
        public async Task<List<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T?> GetById(Guid id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public IQueryable<T> GetQueryable()
        {
            return _context.Set<T>();
        }

        public async Task<bool> IsExist(Guid id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity == null)
            {
                return false;
            }
            return true;
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<T> UpdateEntity(T entity)
        {
            _context.Set<T>().Update(entity);
            await SaveChanges();
            return entity;
        }

    }
}
