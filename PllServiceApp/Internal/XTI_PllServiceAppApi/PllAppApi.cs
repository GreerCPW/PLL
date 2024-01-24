namespace XTI_PllServiceAppApi;

public sealed partial class PllAppApi : AppApiWrapper
{
    public PllAppApi
    (
        IAppApiUser user,
        IServiceProvider sp
    )
        : base
        (
            new AppApi
            (
                PllInfo.AppKey,
                user,
                ResourceAccess.AllowAuthenticated()
                    .WithAllowed(AppRoleName.Admin)
            )
        )
    {
        createPaymentReceivedGroup(sp);
    }

    partial void createPaymentReceivedGroup(IServiceProvider sp);
}