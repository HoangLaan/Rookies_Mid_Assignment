using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Domain.Entities
{
    public class BookCategories
    {
        [Key]
        public Guid BookCategoriesId { get; set; }
        [Required]
        public Guid BookId { get; set; }
        [Required]
        public Guid CategoryId {  get; set; }
        public Book? Book { get; set; }
        public Category? Category { get; set; }
    }
}
