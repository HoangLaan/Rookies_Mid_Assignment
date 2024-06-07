using AutoMapper;
using Azure.Core;
using Microsoft.EntityFrameworkCore;
using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;
using Midterm_Project_Nashtech.Infrastructure.Interfaces;
using Midterm_Project_Nashtech.Infrastructure.IRepositories;

namespace Midterm_Project_Nashtech.Web.Services
{
    public class BookService : IBookService
    {
        private readonly IGenericRepository<Book> _bookRepository;
        private readonly IGenericRepository<BookCategories> _bookCategoriesRepository;
        public IMapper _mapper;

        public BookService(IGenericRepository<Book> bookRepository, IMapper mapper, IGenericRepository<BookCategories> bookCategoriesRepository)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
            _bookCategoriesRepository = bookCategoriesRepository;
        }

        public async Task AddBook(BookRequest bookRequest)
        {
            var book = _mapper.Map<Book>(bookRequest);
            await _bookRepository.AddEntity(book);

            var bookCategory = new BookCategories
            {
                BookCategoriesId = Guid.NewGuid(),
                BookId = book.BookId,
                CategoryId = bookRequest.CategoryId
            };

            await _bookCategoriesRepository.AddEntity(bookCategory);
        }
        public async Task UpdateBook(Guid id, BookRequest bookRequest)
        {
            var book = await GetBookById(id);
            _mapper.Map(bookRequest, book);
            book.BookId = id;
            await _bookRepository.UpdateEntity(book);

            var bookCategory = await _bookCategoriesRepository.GetQueryable().FirstOrDefaultAsync(book => book.BookId == id);

            if (bookCategory != null)
            {
                await _bookCategoriesRepository.DeleteEntityByEntity(bookCategory);
            }

            var newBookCategory = new BookCategories
            {
                BookCategoriesId = Guid.NewGuid(),
                BookId = book.BookId,
                CategoryId = bookRequest.CategoryId
            };

            await _bookCategoriesRepository.AddEntity(newBookCategory);
        }
        public async Task DeleteBook(Guid id)
        {
            var bookCategory = await _bookCategoriesRepository.GetQueryable().FirstOrDefaultAsync(bookCate => bookCate.BookId == id);
            if (bookCategory != null)
            {
                await _bookCategoriesRepository.DeleteEntityByEntity(bookCategory);
            }
            await _bookRepository.DeleteEntity(id);
        }

        public async Task<List<BookResponse>> GetAllBooks()
        {
            var booksList = await _bookRepository.GetQueryable().Include(book => book.BookCategories).
                                    ThenInclude(bookCategory => bookCategory.Category).ToListAsync();
            var ListBookResponse = _mapper.Map<List<BookResponse>>(booksList);

            return ListBookResponse;
        }
        public async Task<List<BookResponse>> GetBooksByTitle(string title)
        {
            var booksList = await _bookRepository.GetQueryable()
                .Where(book => book.Title.ToLower().Contains(title.ToLower()))
                .ToListAsync();
            var ListBookResponse = _mapper.Map<List<BookResponse>>(booksList);
            return ListBookResponse;
        }
        public async Task<Book> GetBookById(Guid id)
        {
            return await _bookRepository.GetById(id);
        }
        public async Task<BookResponse> GetBookResponseById(Guid id)
        {
            var book = await _bookRepository.GetQueryable().Include(book => book.BookCategories).
                                    ThenInclude(bookCategory => bookCategory.Category).FirstOrDefaultAsync(book => book.BookId == id);
            var bookResponse = _mapper.Map<BookResponse>(book);
            return bookResponse;
        }
        public async Task<bool> IsExistBook(Guid id)
        {
            var book = await GetBookById(id);
            if(book == null)
            {
                return false;
            }
            return true;
        }

        
    }
}
