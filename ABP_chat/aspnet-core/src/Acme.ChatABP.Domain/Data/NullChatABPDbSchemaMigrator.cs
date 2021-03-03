using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Acme.ChatABP.Data
{
    /* This is used if database provider does't define
     * IChatABPDbSchemaMigrator implementation.
     */
    public class NullChatABPDbSchemaMigrator : IChatABPDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}