using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;

namespace Midterm_Project_Nashtech.Infrastructure.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryResponse>> GetAllCategories();
        Task<Category> GetCategoryById(Guid id);
        Task AddCategory(CategoryRequest categoryDto);
        Task DeleteCategory(Guid id);
        Task UpdateCategory(Guid id, CategoryRequest category);
        Task<bool> IsExistCategory(Guid id);
    }
}
