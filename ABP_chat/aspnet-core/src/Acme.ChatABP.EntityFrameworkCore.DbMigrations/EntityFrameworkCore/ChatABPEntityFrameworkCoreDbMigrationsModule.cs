using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace Acme.ChatABP.EntityFrameworkCore
{
    [DependsOn(
        typeof(ChatABPEntityFrameworkCoreModule)
        )]
    public class ChatABPEntityFrameworkCoreDbMigrationsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<ChatABPMigrationsDbContext>();
        }
    }
}
