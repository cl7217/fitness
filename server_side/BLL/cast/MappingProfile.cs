using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DTO;
using DAL;
namespace BLL.cast
{
    public class MappingProfile : Profile
        
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>().ForMember(dest => dest.HealthFundName, opt => 
            opt.MapFrom(src => src.HealthFund != null ? src.HealthFund.Name : null));

            CreateMap<Purchase, PurchaseDTO>()
                .ForMember(dest => dest.PackageName
                ,src=>src.MapFrom(src=>src.Package.Name))
                .ReverseMap();
        }
    }
}