using Midterm_Project_Nashtech.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Domain.Entities
{
    public class BorrowingRequest
    {
        [Key]
        public Guid RequestId { get; set; }
        [Required]
        public Guid RequestorId { get; set; }
        public DateTime RequestDate { get; set; }
        [Required]
        public RequestStatus RequestStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public User? Requestor { get; set; }
        public ICollection<BorrowingRequestDetails> RequestDetails { get; set; }
    }
}
