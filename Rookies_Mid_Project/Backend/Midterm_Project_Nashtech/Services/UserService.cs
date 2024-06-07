using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;
using Midterm_Project_Nashtech.Infrastructure.Interfaces;
using Midterm_Project_Nashtech.Infrastructure.IRepositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Midterm_Project_Nashtech.Web.Services
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly IConfiguration _configuration;
        public IMapper _mapper;
        public UserService(IGenericRepository<User> userRepository, IMapper mapper, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _configuration = configuration;
        }
        public async Task AddUser(UserDto userDto)
        {
            await _userRepository.AddEntity(_mapper.Map<User>(userDto));
        }

        public async Task DeleteUser(Guid id)
        {
            await _userRepository.DeleteEntity(id);
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _userRepository.GetAll();
        }

        public async Task<User?> GetUserById(Guid id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task<User?> GetUserByUsername(string username)
        {
            return await _userRepository.GetQueryable().FirstOrDefaultAsync(u => u.UserName == username);
        }

        public async Task<bool> IsExistUser(Guid id)
        {
            if (! await _userRepository.IsExist(id))
            {
                return false;
            }
            return true;
        }

        public async Task UpdateUser(Guid id, UserDto userDto)
        {
            var user = await GetUserById(id);
            _mapper.Map(userDto, user);
            user.UserId = id;
            await _userRepository.UpdateEntity(user);
        }
        public string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.IsSuperUser ? "SuperUser" : "NormalUser")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("Jwt:Token").Value!));

            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credential
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        
    }
}
