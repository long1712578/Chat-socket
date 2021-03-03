using Acme.ChatABP.Dtos.Request;
using Acme.ChatABP.Dtos.Response;
using Acme.ChatABP.Entities;
using AutoMapper;

namespace Acme.ChatABP
{
    public class ChatABPApplicationAutoMapperProfile : Profile
    {
        public ChatABPApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
            CreateMap<Message, MessageDto>();
            CreateMap<MessageRequest, Message>();
        }
    }
}
