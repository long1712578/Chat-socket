using Acme.ChatABP.Books;
using Acme.ChatABP.Dtos.Request;
using Acme.ChatABP.Dtos.Response;
using Acme.ChatABP.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Acme.ChatABP.Messages
{
    public class MessageAppService : CrudAppService<
            Message, //The Book entity
            MessageDto, //Used to show books
            Guid, //Primary key of the book entity
            PagedAndSortedResultRequestDto, //Used for paging/sorting
            MessageRequest>,
        IMessageAppServices
    {


        public MessageAppService(IRepository<Message, Guid> repository)
            : base(repository)
        {

        }
    }
}
