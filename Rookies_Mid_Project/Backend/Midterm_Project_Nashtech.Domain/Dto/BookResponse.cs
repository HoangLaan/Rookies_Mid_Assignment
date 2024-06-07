using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Domain.Dto
{
    public class BookResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string Author { get; set; } = string.Empty;
        public List<string> CategoryNames {  get; set; }
        public DateTime PublishedDate { get; set; }
    }
}
