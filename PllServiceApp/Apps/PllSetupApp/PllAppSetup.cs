using XTI_App.Abstractions;
using XTI_Hub.Abstractions;
using XTI_HubAppClient;
using XTI_PllServiceAppApi;
using XTI_PllSeviceAppApi;

namespace PllSetupApp;

internal sealed class PllAppSetup : IAppSetup
{
    private readonly HubAppClient hubClient;
    private readonly PllJobSetup jobSetup;

    public PllAppSetup(HubAppClient hubClient, PllJobSetup jobSetup)
    {
        this.hubClient = hubClient;
        this.jobSetup = jobSetup;
    }

    public async Task Run(AppVersionKey versionKey)
    {
        await hubClient.Install.SetUserAccess
        (
            new SetUserAccessRequest
            (
                new SystemUserName(PllInfo.AppKey, Environment.MachineName).UserName,
                new SetUserAccessRoleRequest
                (
                    AppKey.WebApp("Pll"),
                    AppRoleName.Admin
                ),
                new SetUserAccessRoleRequest
                (
                    AppKey.WebApp("Cityworks"),
                    AppRoleName.Admin
                ),
                new SetUserAccessRoleRequest
                (
                    AppKey.WebApp("ScheduledJobs"),
                    AppRoleName.Admin
                )
            )
        );
        await jobSetup.Run();
    }
}
