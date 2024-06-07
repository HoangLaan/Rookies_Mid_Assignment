

using System.ComponentModel.DataAnnotations;

namespace Midterm_Project_Nashtech.Domain.Entities
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }
        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Password is required")]
        public string PasswordHash { get; set; } = string.Empty;
        [Required]
        public bool IsSuperUser { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<BorrowingRequest>? BorrowingRequests { get; set; }
    }
}
