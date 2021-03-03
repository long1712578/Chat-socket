using Acme.ChatABP.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Acme.ChatABP.Permissions
{
    public class ChatABPPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(ChatABPPermissions.GroupName);

            //Define your own permissions here. Example:
            //myGroup.AddPermission(ChatABPPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<ChatABPResource>(name);
        }
    }
}
