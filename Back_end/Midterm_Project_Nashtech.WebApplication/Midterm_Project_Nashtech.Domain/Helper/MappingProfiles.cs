

using AutoMapper;
using Midterm_Project_Nashtech.Domain.Dto;
using Midterm_Project_Nashtech.Domain.Entities;

namespace Midterm_Project_Nashtech.Domain.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //Map Book
            CreateMap<BookRequest, Book>()
                .ForMember(des => des.BookId,
                           src => src.MapFrom(src => Guid.NewGuid()));
            CreateMap<Book, BookResponse>()
                .ForMember(des => des.Id,
                           opt => opt.MapFrom(src => src.BookId))
                .ForMember(des => des.CategoryNames,
                           opt => opt.MapFrom(src => src.BookCategories.Select(bc => bc.Category.Name).ToList()));

            //Map User
            CreateMap<UserDto, User>()
                .ForMember(des => des.UserId,
                           src => src.MapFrom(dto => Guid.NewGuid()))
                .ForMember(des => des.CreatedAt,
                           opt => opt.MapFrom(dto => DateTime.Now))
                .ForMember(des => des.PasswordHash,
                           opt => opt.MapFrom(dto => dto.Password));

            //Map Category
            CreateMap<CategoryRequest, Category>()
                .ForMember(des => des.CategoryId,
                           src => src.MapFrom(req => Guid.NewGuid()));
            CreateMap<Category, CategoryResponse>()
                .ForMember(des => des.Id,
                           opt => opt.MapFrom(category => category.CategoryId));
        }
    }
}
