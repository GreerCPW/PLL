using XTI_PllWebAppApi.WipCases;

namespace XTI_PllWebAppApi;

partial class PllAppApi
{
    private WipCasesGroup? _WipCases;

    public WipCasesGroup WipCases { get => _WipCases ?? throw new ArgumentNullException(nameof(_WipCases)); }

    partial void createWipCasesGroup(IServiceProvider sp)
    {
        _WipCases = new WipCasesGroup
        (
            source.AddGroup(nameof(WipCases), Access.WithAllowed(PllInfo.Roles.Customer)),
            sp
        );
    }
}