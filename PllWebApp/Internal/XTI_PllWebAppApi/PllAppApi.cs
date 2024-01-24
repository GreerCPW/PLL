namespace XTI_PllWebAppApi;

public sealed partial class PllAppApi : WebAppApiWrapper
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
            ),
            sp
        )
    {
        createAfterPaymentGroup(sp);
        createCaseGroup(sp);
        createCustomerCaseGroup(sp);
        createHomeGroup(sp);
        createPaymentsGroup(sp);
        createWipCaseGroup(sp);
        createWipCasesGroup(sp);
    }

    partial void createAfterPaymentGroup(IServiceProvider sp);

    partial void createCaseGroup(IServiceProvider sp);

    partial void createCustomerCaseGroup(IServiceProvider sp);

    partial void createHomeGroup(IServiceProvider sp);

    partial void createPaymentsGroup(IServiceProvider sp);

    partial void createWipCaseGroup(IServiceProvider sp);

    partial void createWipCasesGroup(IServiceProvider sp);

    protected override void ConfigureTemplate(AppApiTemplate template)
    {
        base.ConfigureTemplate(template);
        template.ExcludeValueTemplates
        (
            (templ, codeGen) =>
            {
                if (codeGen == ApiCodeGenerators.Dotnet)
                {
                    var ns = templ.DataType.Namespace ?? "";
                    return ns.StartsWith("CPW_Cityworks.Abstractions") ||
                        ns.StartsWith("CPW_Customer.Abstractions") ||
                        ns.StartsWith("CPW_Gis.Abstractions") ||
                        ns.StartsWith("CPW_UtilityAccount.Abstractions") ||
                        ns.StartsWith("CPW_Pll.Abstractions");
                }
                return false;
            }
        );
    }
}