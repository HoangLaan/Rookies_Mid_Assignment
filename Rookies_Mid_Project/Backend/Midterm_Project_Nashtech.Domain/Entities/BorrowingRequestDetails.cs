using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Domain.Entities
{
    public class BorrowingRequestDetails
    {
        [Key]
        public Guid RequestDetailId { get; set; }
        [Required]
        public Guid RequestId { get; set; }
        [Required]
        public Guid BookId { get; set; }
        public Book Book { get; set; }
        public BorrowingRequest BorrowingRequest { get; set; }
    }
}
