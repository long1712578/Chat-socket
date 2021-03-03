using Acme.ChatABP.Dtos.Request;
using Acme.ChatABP.Dtos.Response;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.ChatABP.Books
{
    public interface IMessageAppServices: ICrudAppService<MessageDto,Guid, PagedAndSortedResultRequestDto, MessageRequest>
    {
    }
}
