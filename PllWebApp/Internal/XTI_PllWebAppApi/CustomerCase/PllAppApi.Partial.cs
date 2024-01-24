using XTI_PllWebAppApi.CustomerCase;

namespace XTI_PllWebAppApi;

partial class PllAppApi
{
    private CustomerCaseGroup? _CustomerCase;

    public CustomerCaseGroup CustomerCase { get => _CustomerCase ?? throw new ArgumentNullException(nameof(_CustomerCase)); }

    partial void createCustomerCaseGroup(IServiceProvider sp)
    {
        _CustomerCase = new CustomerCaseGroup
        (
            source.AddGroup(nameof(CustomerCase), Access.WithAllowed(PllInfo.Roles.Customer)),
            sp
        );
    }
}