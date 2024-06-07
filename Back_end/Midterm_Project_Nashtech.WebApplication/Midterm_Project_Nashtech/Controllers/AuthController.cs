using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;
using Midterm_Project_Nashtech.Infrastructure.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Midterm_Project_Nashtech.Web.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] UserDto userDto)
        {
            var user_ = await _userService.GetUserByUsername(userDto.UserName);
            if (user_ != null)
            {
                return BadRequest("Username already exist");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
            userDto.Password = passwordHash;

            await _userService.AddUser(userDto);
            return Ok("Register Successfully");
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserDto userDto)
        {
            var user_ = await _userService.GetUserByUsername(userDto.UserName);
            if (user_ == null)
            {
                return BadRequest("User not found");
            }

            if(!BCrypt.Net.BCrypt.Verify(userDto.Password, user_.PasswordHash))
            {
                return BadRequest("Wrong password");
            }

            string token = _userService.CreateToken(user_);
            return Ok(token);
        }

        
    }
}
