using AutoMapper;
using MaiEats.Core.Dtos.Business;
// using MaiEats.Core.Dtos.User;
// using MaiEats.Core.Dtos.Category;
using MaiEats.Core.Models;
using MaiEats.Models;

namespace MaiEats.Core.AutoMapperConfig;

public class AutoMapperConfigProfile : Profile
{
    public AutoMapperConfigProfile()
    {
        // Business
        CreateMap<CreateBusinessDto, Business>();
        CreateMap<Business, GetBusinessDto>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category));
        
        // Category
        // CreateMap<CreateCategoryDto, Category>();
        // CreateMap<Category, GetCategoryDto>();
        
        // User
        // CreateMap<CreateUserDto, User>();
        // CreateMap<User, GetUserDto>();
    }
}