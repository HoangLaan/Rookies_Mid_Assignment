using Midterm_Project_Nashtech.Domain.Helper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Domain.Dto
{
    public class UserDto
    {
        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
        public string UserName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [PasswordValidation]
        public string Password { get; set; } = string.Empty;
        public bool IsSuperUser { get; set; }

    }
}
