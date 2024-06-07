using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Infrastructure.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsers();
        Task<User?> GetUserById(Guid id);
        Task<User?> GetUserByUsername(string username);
        Task AddUser(UserDto user);
        Task DeleteUser(Guid id);
        Task UpdateUser(Guid id, UserDto user);
        Task<bool> IsExistUser(Guid id);
        string CreateToken(User user);
    }
}
