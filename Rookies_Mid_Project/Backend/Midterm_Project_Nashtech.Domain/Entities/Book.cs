using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Domain.Entities
{
    public class Book
    {
        [Key]
        public Guid BookId { get; set; }
        [Required(ErrorMessage = "Title is required")]
        
        public string Title { get; set; } = string.Empty;
        [Required(ErrorMessage = "Author is required")]
        public string Author { get; set; } = string.Empty;
        [Required(ErrorMessage = "Description is required")]
        public string Description {  get; set; } = string.Empty;
        [Required(ErrorMessage = "Quantity is required")]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity must be non-negative")]
        public int Quantity { get; set; }
        public DateTime PublishedDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<BookCategories>? BookCategories {  get; set; }
        public ICollection<BorrowingRequestDetails>? RequestsDetails { get; set; }
    }
}
