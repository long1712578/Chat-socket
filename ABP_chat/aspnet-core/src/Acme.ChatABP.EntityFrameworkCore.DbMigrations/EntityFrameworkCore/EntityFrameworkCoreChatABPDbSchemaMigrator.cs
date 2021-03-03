using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Acme.ChatABP.Data;
using Volo.Abp.DependencyInjection;

namespace Acme.ChatABP.EntityFrameworkCore
{
    public class EntityFrameworkCoreChatABPDbSchemaMigrator
        : IChatABPDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreChatABPDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the ChatABPMigrationsDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<ChatABPMigrationsDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}