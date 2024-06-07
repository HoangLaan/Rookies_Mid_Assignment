using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Domain.Helper
{
    public class PasswordValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var password = value as string;
            if (string.IsNullOrWhiteSpace(password)) 
                return new ValidationResult("Password is required");

            if (password.Length < 8)
                return new ValidationResult("Password must be at least 8 characters");

            if (!Regex.IsMatch(password, @"[A-Z]"))
                return new ValidationResult("Password must be at least 1 Uppercase letter");

            if (!Regex.IsMatch(password, @"[a-z]"))
                return new ValidationResult("Password must be at least 1 Lowercase letter");

            if (!Regex.IsMatch(password, @"[0-9]"))
                return new ValidationResult("Password must contain at least one digit");
            
            if (!Regex.IsMatch(password, @"[\W_]"))
                return new ValidationResult("Password must contain at least one special character");
            
            return ValidationResult.Success;
        }
    }
}
