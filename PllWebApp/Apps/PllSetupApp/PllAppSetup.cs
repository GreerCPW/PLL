using CPW_PllDB;
using XTI_App.Abstractions;
using XTI_DB;
using XTI_Hub.Abstractions;
using XTI_HubAppClient;
using XTI_PllWebAppApi;

namespace PllSetupApp;

internal sealed class PllAppSetup : IAppSetup
{
    private readonly DbAdmin<PllDbContext> dbAdmin;
    private readonly HubAppClient hubClient;

    public PllAppSetup(DbAdmin<PllDbContext> dbAdmin, HubAppClient hubClient)
    {
        this.dbAdmin = dbAdmin;
        this.hubClient = hubClient;
    }

    public async Task Run(AppVersionKey versionKey)
    {
        await dbAdmin.Update();
        await hubClient.Install.SetUserAccess
        (
            new SetUserAccessRequest
            (
                new SystemUserName(PllInfo.AppKey, Environment.MachineName).UserName,
                new SetUserAccessRoleRequest
                (
                    AppKey.WebApp("Cityworks"),
                    AppRoleName.Admin
                ),
                new SetUserAccessRoleRequest
                (
                    AppKey.WebApp("GIS"),
                    AppRoleName.Admin
                )
            )
        );
    }
}
