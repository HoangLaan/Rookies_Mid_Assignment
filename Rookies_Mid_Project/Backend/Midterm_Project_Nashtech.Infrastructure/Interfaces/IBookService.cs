using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Infrastructure.Interfaces
{
    public interface IBookService
    {
        Task<List<BookResponse>> GetAllBooks();
        Task<Book> GetBookById(Guid id);
        Task<BookResponse> GetBookResponseById(Guid id);
        Task AddBook(BookRequest book);
        Task DeleteBook(Guid id);
        Task UpdateBook(Guid id, BookRequest book);
        Task<bool> IsExistBook(Guid id);
        Task<List<BookResponse>> GetBooksByTitle(string title);
    }
}
