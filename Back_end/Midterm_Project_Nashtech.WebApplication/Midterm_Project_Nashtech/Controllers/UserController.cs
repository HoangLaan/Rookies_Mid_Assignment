using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Infrastructure.Interfaces;

namespace Midterm_Project_Nashtech.Web.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetAllUsers()
        {
            var usersList = await _userService.GetAllUsers();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(usersList);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest("Invalid ID");
            }
            if (!await _userService.IsExistUser(id))
            {
                return NotFound("User doesn't exist");
            }

            var user = _userService.GetUserById(id);

            return Ok(user);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UserDto userRequest)
        {
            if (!await _userService.IsExistUser(id))
                return BadRequest("Not Found user");
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await _userService.UpdateUser(id, userRequest);

            return Ok(userRequest);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> DeleteUser (Guid id)
        {
            if(!await  _userService.IsExistUser(id))
                return NotFound("Not found User");
            await _userService.DeleteUser(id);
            return Ok("Successfully");
        }
    }

}
