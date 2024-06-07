
using System.ComponentModel.DataAnnotations;

namespace Midterm_Project_Nashtech.Domain.Entities
{
    public class Category
    {
        [Key]
        public Guid CategoryId { get; set; }
        [Required(ErrorMessage ="Category name is required")]
        public string Name { get; set; } = string.Empty;
        [Required(ErrorMessage ="Category description is required")]
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<BookCategories>? BookCategories { get; set; }
    }
}
