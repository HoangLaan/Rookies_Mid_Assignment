using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;
using Midterm_Project_Nashtech.Infrastructure.Interfaces;
using Midterm_Project_Nashtech.Infrastructure.IRepositories;

namespace Midterm_Project_Nashtech.Web.Services
{
    public class CategoryService : ICategoryService
    {  
        private readonly IGenericRepository<Category> _categoryRepository;
        private readonly IGenericRepository<BookCategories> _bookCategoriesRepository;
        public IMapper _mapper;
        public CategoryService(IGenericRepository<Category> categoryRepository, IMapper mapper, IGenericRepository<BookCategories> bookCategoriesRepository)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _bookCategoriesRepository = bookCategoriesRepository;
        }
        public async Task AddCategory(CategoryRequest categoryDto)
        {
            await _categoryRepository.AddEntity(_mapper.Map<Category>(categoryDto));
        }

        public async Task DeleteCategory(Guid id)
        {
            var bookCategory = await _bookCategoriesRepository.GetQueryable().FirstOrDefaultAsync(bookCate => bookCate.CategoryId == id);
            if (bookCategory != null)
            {
                await _bookCategoriesRepository.DeleteEntityByEntity(bookCategory);
            };
            await _categoryRepository.DeleteEntity(id);
        }

        public async Task<List<CategoryResponse>> GetAllCategories()
        {
            var list  = await _categoryRepository.GetAll();
            var listCateResponse = _mapper.Map<List<CategoryResponse>>(list);
            return listCateResponse;
        }

        public async Task<Category> GetCategoryById(Guid id)
        {
            return await _categoryRepository.GetById(id);
        }

        public async Task<bool> IsExistCategory(Guid id)
        {
            if (! await _categoryRepository.IsExist(id))
                return false;
            return true;
        }

        public async Task UpdateCategory(Guid id, CategoryRequest categoryDto)
        {
            var category = await _categoryRepository.GetById(id);
            _mapper.Map(categoryDto, category);
            category.CategoryId = id;
            await _categoryRepository.UpdateEntity(category);

        }
    }
}
