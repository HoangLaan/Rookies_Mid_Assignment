using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Domain.Dto
{
    public class BorrowingRequestDto
    {
        public Guid UserId { get; set; }
        public List<Guid> BookIds { get; set; }
    }
}
