namespace XTI_PllWebAppApi;

public sealed class PllRoles
{
    public static readonly PllRoles Instance = new();

    public AppRoleName Admin { get; } = AppRoleName.Admin;
    public AppRoleName Customer { get; } = new(nameof(Customer));
}
