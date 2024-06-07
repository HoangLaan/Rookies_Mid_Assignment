using Midterm_Project_Nashtech.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Domain.Dto
{
    public class BorrowingResponseDto
    {
        public Guid Id { get; set; }
        public string? UserName { get; set; } //From User
        public string? Title { get; set; } // From Book
        public string? RequestDate { get; set; }
        public RequestStatus RequestStatus { get; set; }
    }
}
