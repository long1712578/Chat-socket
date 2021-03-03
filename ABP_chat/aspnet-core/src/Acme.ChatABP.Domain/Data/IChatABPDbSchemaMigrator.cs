using System.Threading.Tasks;

namespace Acme.ChatABP.Data
{
    public interface IChatABPDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
