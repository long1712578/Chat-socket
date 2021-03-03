using Acme.ChatABP.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Acme.ChatABP.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class ChatABPController : AbpController
    {
        protected ChatABPController()
        {
            LocalizationResource = typeof(ChatABPResource);
        }
    }
}