using XTI_PllWebAppApi.Home;

namespace XTI_PllWebAppApi;

partial class PllAppApi
{
    private HomeGroup? home;

    public HomeGroup Home { get => home ?? throw new ArgumentNullException(nameof(home)); }

    partial void createHomeGroup(IServiceProvider sp)
    {
        home = new HomeGroup
        (
            source.AddGroup(nameof(Home), ResourceAccess.AllowAuthenticated()),
            sp
        );
    }
}