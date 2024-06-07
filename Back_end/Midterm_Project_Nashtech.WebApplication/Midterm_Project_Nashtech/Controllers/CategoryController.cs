using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;
using Midterm_Project_Nashtech.Infrastructure.Interfaces;

namespace Midterm_Project_Nashtech.Web.Controllers
{
    [Route("api/categories")]
    [Authorize(Roles = "SuperUser")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public IMapper _mapper;
        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetAllCategories() 
        {
            var catesList = await _categoryService.GetAllCategories();
            return Ok(catesList);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<Category>> GetCategory(Guid id) 
        {
            if (!await _categoryService.IsExistCategory(id))
                return NotFound("Not found Category");

            var category = await _categoryService.GetCategoryById(id);

            return Ok(category);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        public async Task<ActionResult<Category>> AddCategory([FromBody] CategoryRequest categoryDto)
        {
            var list = await _categoryService.GetAllCategories();
            var category = list.Where(c => c.Name.Trim().ToUpper() == categoryDto.Name.ToUpper()).FirstOrDefault();

            if(category != null)
            {
                ModelState.AddModelError("", "Category already exist");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _categoryService.AddCategory(categoryDto);
            return Ok(categoryDto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            if (!await _categoryService.IsExistCategory(id))
                return NotFound("Not found Category");

            await _categoryService.DeleteCategory(id);

            return Ok("Successfully");
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] CategoryRequest categoryDto)
        {
            if (!await _categoryService.IsExistCategory(id))
                return BadRequest("Not Found Category");
            
            await _categoryService.UpdateCategory(id, categoryDto);
            return Ok(categoryDto);
        }
    }
}
