using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;
using Midterm_Project_Nashtech.Domain.Enums;
using Midterm_Project_Nashtech.Infrastructure.Interfaces;
using Midterm_Project_Nashtech.Infrastructure.IRepositories;

namespace Midterm_Project_Nashtech.Web.Services
{
    public class BorrowBookService : IBorrowBookService
    {
        private readonly IGenericRepository<BorrowingRequest> _requestRepository;
        private readonly IGenericRepository<User> _userRepository;
        private readonly IGenericRepository<Book> _bookRepository;
        public IMapper _mapper;
        public BorrowBookService(
            IGenericRepository<BorrowingRequest> requestRepository, 
            IGenericRepository<User> userRepository, 
            IGenericRepository<Book> bookRepository,
            IMapper mapper)
        {
            _requestRepository = requestRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _bookRepository = bookRepository;
        }

        public async Task<string> BorrowBookAsync(BorrowingRequestDto requestDto)
        {
            if (requestDto.BookIds.Count > 5) 
            {
                return "You can not borrow more than 5 books in a request";
            }

            var user = await _userRepository.GetQueryable()
                                .Include(u => u.BorrowingRequests)
                                .FirstOrDefaultAsync(u => u.UserId == requestDto.UserId);

            if (user == null)
            {
                return "User Not Found";
            }

            if (user.BorrowingRequests.Count(r => r.RequestDate.Month == DateTime.Now.Month) >= 3)
            {
                return "Reach limit of 3 request per month";
            }
            var newRequest = new BorrowingRequest()
            {
                RequestorId = requestDto.UserId,
                RequestDate = DateTime.Now,
                RequestStatus = RequestStatus.Waiting,
                RequestDetails = new List<BorrowingRequestDetails>()
            };

            foreach (var bookId in requestDto.BookIds)
            {
                var book = await _bookRepository.GetById(bookId);

                if (book == null) 
                {
                    continue;
                }
                newRequest.RequestDetails.Add(new BorrowingRequestDetails
                {
                    BookId = bookId
                });
            }

            await _requestRepository.AddEntity(newRequest);

            return "Request Successfully";
        }

        public async Task<List<BorrowingResponseDto>> GetAllRequest()
        {
            var list = await _requestRepository.GetQueryable()
                                .Include(request => request.Requestor)
                                .Include(request => request.RequestDetails)
                                  .ThenInclude(a => a.Book)
                                .Select(b => new BorrowingResponseDto
                                {
                                    Id = b.RequestId,
                                    UserName = b.Requestor.UserName,
                                    RequestDate = b.RequestDate.ToString("dd/MM/yyyy"),
                                    RequestStatus = b.RequestStatus,
                                    Title = string.Join(", ", b.RequestDetails.Select(reqDetail => reqDetail.Book.Title))
                                })
                                  .ToListAsync();
            return list;
        }
        public async Task<string> PendingRequest(Guid requestId, RequestStatus status)
        {
            var request = await _requestRepository.GetById(requestId);
            if (request == null)
            {
                return "Request not found";
            }

            request.RequestStatus = status;
            await _requestRepository.SaveChanges();

            return "Request status updated successfully";
        }
    }
}
