using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;
using Midterm_Project_Nashtech.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midterm_Project_Nashtech.Infrastructure.Interfaces
{
    public interface IBorrowBookService
    {
        Task<string> BorrowBookAsync(BorrowingRequestDto requestDto);
        Task<List<BorrowingResponseDto>> GetAllRequest();
        Task<String> PendingRequest(Guid requestId, RequestStatus status);
    }
}
