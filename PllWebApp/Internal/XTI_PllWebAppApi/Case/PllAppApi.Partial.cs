using XTI_PllWebAppApi.Case;

namespace XTI_PllWebAppApi;

partial class PllAppApi
{
    private CaseGroup? _Case;

    public CaseGroup Case { get => _Case ?? throw new ArgumentNullException(nameof(_Case)); }

    partial void createCaseGroup(IServiceProvider sp)
    {
        _Case = new CaseGroup
        (
            source.AddGroup(nameof(Case)),
            sp
        );
    }
}