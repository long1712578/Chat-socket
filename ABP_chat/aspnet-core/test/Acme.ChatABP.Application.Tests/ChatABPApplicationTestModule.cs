using Volo.Abp.Modularity;

namespace Acme.ChatABP
{
    [DependsOn(
        typeof(ChatABPApplicationModule),
        typeof(ChatABPDomainTestModule)
        )]
    public class ChatABPApplicationTestModule : AbpModule
    {

    }
}