using AutoMapper;
using ProAgil.Domain;
using ProAgil.Domain.Identity;
using ProAgil.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProAgil.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Lote, LoteDTO>().ReverseMap();

            CreateMap<Palestrante, PalestranteDTO>()
                .ForMember(dest => dest.Eventos, opt =>
                {
                    opt.MapFrom(src => src.PalestrantesEventos.Select(r => r.Evento).ToList());
                })
                .ReverseMap();

            CreateMap<Evento, EventoDTO>()
                .ForMember(dest => dest.Palestrantes, opt => {
                    opt.MapFrom(src => src.PalestrantesEventos.Select(r => r.Palestrante).ToList());
                })
                .ReverseMap();

            CreateMap<RedeSocial, RedeSocialDTO>().ReverseMap();

            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserLoginDTO>().ReverseMap();
        }
    }
}
