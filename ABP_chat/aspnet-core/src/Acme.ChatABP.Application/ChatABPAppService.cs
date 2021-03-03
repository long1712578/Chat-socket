using System;
using System.Collections.Generic;
using System.Text;
using Acme.ChatABP.Localization;
using Volo.Abp.Application.Services;

namespace Acme.ChatABP
{
    /* Inherit your application services from this class.
     */
    public abstract class ChatABPAppService : ApplicationService
    {
        protected ChatABPAppService()
        {
            LocalizationResource = typeof(ChatABPResource);
        }
    }
}
