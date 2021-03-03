using Acme.ChatABP.Entities;
using Microsoft.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Acme.ChatABP.EntityFrameworkCore
{
    public static class ChatABPDbContextModelCreatingExtensions
    {
        public static void ConfigureChatABP(this ModelBuilder builder)
        {
            Check.NotNull(builder, nameof(builder));

            /* Configure your own tables/entities inside here */

            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(ChatABPConsts.DbTablePrefix + "YourEntities", ChatABPConsts.DbSchema);
            //    b.ConfigureByConvention(); //auto configure for the base class props
            //    //...
            //});
            builder.Entity<Message>(b =>
            {
                b.ToTable(ChatABPConsts.DbTablePrefix + "Messages",
                         ChatABPConsts.DbSchema);
                b.ConfigureByConvention(); //auto configure for the base class props
                b.Property(x => x.SenderName).IsRequired().HasMaxLength(128);
                b.Property(x => x.TimeStamp).IsRequired();

            });
        }
    }
}