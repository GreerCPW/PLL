namespace XTI_PllWebAppApi;

public sealed class PllAppApiFactory : AppApiFactory
{
    private readonly IServiceProvider sp;

    public PllAppApiFactory(IServiceProvider sp)
    {
        this.sp = sp;
    }

    public new PllAppApi Create(IAppApiUser user) => (PllAppApi)base.Create(user);
    public new PllAppApi CreateForSuperUser() => (PllAppApi)base.CreateForSuperUser();

    protected override IAppApi _Create(IAppApiUser user) => new PllAppApi(user, sp);
}