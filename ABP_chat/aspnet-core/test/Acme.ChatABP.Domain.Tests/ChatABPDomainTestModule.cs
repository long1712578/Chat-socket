using Acme.ChatABP.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Acme.ChatABP
{
    [DependsOn(
        typeof(ChatABPEntityFrameworkCoreTestModule)
        )]
    public class ChatABPDomainTestModule : AbpModule
    {

    }
}