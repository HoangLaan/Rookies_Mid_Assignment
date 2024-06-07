using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Enums;
using Midterm_Project_Nashtech.Infrastructure.Interfaces;
using Midterm_Project_Nashtech.Web.Services;

namespace Midterm_Project_Nashtech.Web.Controllers
{
    [Route("api/borrow-requests")]
    [ApiController]
    public class BorrowBookController : ControllerBase
    {
        private readonly IBorrowBookService _requestService;
        public BorrowBookController(IBorrowBookService requestService)
        {
            _requestService = requestService;
        }

        [HttpPost("request")]
        public async Task<IActionResult> BorrowBooks([FromBody] BorrowingRequestDto requestDto)
        {
            var result = await _requestService.BorrowBookAsync(requestDto);
            if (result == "Request Successfully")
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("request")]
        public async Task<IActionResult> GetAllBorrowingRequest()
        {
            var response = await _requestService.GetAllRequest();
            return Ok(response);
        }

        [HttpPost("request/{requestId}/approve")]
        [Authorize(Roles = "SuperUser")]
        public async Task<IActionResult> ApproveRequest(Guid requestId)
        {
            return Ok(await _requestService.PendingRequest(requestId, RequestStatus.Approved));
        }

        [HttpPost("request/{requestId}/reject")]
        [Authorize(Roles = "SuperUser")]
        public async Task<IActionResult> RejectRequest(Guid requestId)
        {
            return Ok(await _requestService.PendingRequest(requestId, RequestStatus.Rejected));
        }

    }
}
