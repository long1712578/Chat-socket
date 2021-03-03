using Microsoft.EntityFrameworkCore;
using Acme.ChatABP.Users;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.Identity;
using Volo.Abp.Users.EntityFrameworkCore;
using Acme.ChatABP.Entities;

namespace Acme.ChatABP.EntityFrameworkCore
{
    /* This is your actual DbContext used on runtime.
     * It includes only your entities.
     * It does not include entities of the used modules, because each module has already
     * its own DbContext class. If you want to share some database tables with the used modules,
     * just create a structure like done for AppUser.
     *
     * Don't use this DbContext for database migrations since it does not contain tables of the
     * used modules (as explained above). See ChatABPMigrationsDbContext for migrations.
     */
    [ConnectionStringName("Default")]
    public class ChatABPDbContext : AbpDbContext<ChatABPDbContext>
    {
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Message> Messages { get; set; }

        /* Add DbSet properties for your Aggregate Roots / Entities here.
         * Also map them inside ChatABPDbContextModelCreatingExtensions.ConfigureChatABP
         */

        public ChatABPDbContext(DbContextOptions<ChatABPDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            /* Configure the shared tables (with included modules) here */

            builder.Entity<AppUser>(b =>
            {
                b.ToTable(AbpIdentityDbProperties.DbTablePrefix + "Users"); //Sharing the same table "AbpUsers" with the IdentityUser
                
                b.ConfigureByConvention();
                b.ConfigureAbpUser();

                /* Configure mappings for your additional properties
                 * Also see the ChatABPEfCoreEntityExtensionMappings class
                 */
            });


            /* Configure your own tables/entities inside the ConfigureChatABP method */

            builder.ConfigureChatABP();
        }
    }
}
