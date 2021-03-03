using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Acme.ChatABP
{
    [Dependency(ReplaceServices = true)]
    public class ChatABPBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "ChatABP";
    }
}
