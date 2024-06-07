using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;
using Midterm_Project_Nashtech.Infrastructure.Interfaces;
using System.Data.Common;

namespace Midterm_Project_Nashtech.Web.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        public IMapper _mapper;

        public BookController(IBookService bookService, IMapper mapper)
        {
            _bookService = bookService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Book>))]
        public async Task<IActionResult> GetAllBooks()
        {
            var booksList = await _bookService.GetAllBooks();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(booksList);
        }

        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(200, Type =typeof(Book))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetBook(Guid id) 
        {
            if (! await _bookService.IsExistBook(id))
            {
                return BadRequest("Not found book");
            }
            var book = await _bookService.GetBookResponseById(id);
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(book);
        }

        [HttpPost]
        [Authorize(Roles = "SuperUser")]
        [ProducesResponseType(201, Type = typeof(IEnumerable<Book>))]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Book>> AddBook([FromBody] BookRequest bookRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _bookService.AddBook(bookRequest);
            return Ok(bookRequest);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperUser")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            if (!await _bookService.IsExistBook(id))
                return NotFound("Not found book");
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await _bookService.DeleteBook(id);
            return Ok("Successfull");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperUser")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public async Task<IActionResult> UpdateBook(Guid id, [FromBody] BookRequest bookRequest)
        {
            if (!await _bookService.IsExistBook(id))
                return NotFound("Not found book");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _bookService.UpdateBook(id, bookRequest);
            return Ok(bookRequest);
        }

        [HttpGet("search")]
        [Authorize]
        public async Task<IActionResult> Search(string title)
        {
            if (string.IsNullOrEmpty(title))
            {
                return BadRequest("Search query cannot be empty.");
            }

            var bookList = await _bookService.GetBooksByTitle(title);

            return Ok(bookList);
        }
    }
}
