using XTI_PllWebAppApi.WipCase;

namespace XTI_PllWebAppApi;

partial class PllAppApi
{
    private WipCaseGroup? _WipCase;

    public WipCaseGroup WipCase { get => _WipCase ?? throw new ArgumentNullException(nameof(_WipCase)); }

    partial void createWipCaseGroup(IServiceProvider sp)
    {
        _WipCase = new WipCaseGroup
        (
            source.AddGroup(nameof(WipCase), Access.WithAllowed(PllInfo.Roles.Customer)),
            sp
        );
    }
}