using XTI_PllWebAppApi.AfterPayment;

namespace XTI_PllWebAppApi;

partial class PllAppApi
{
    private AfterPaymentGroup? _AfterPayment;

    public AfterPaymentGroup AfterPayment { get => _AfterPayment ?? throw new ArgumentNullException(nameof(_AfterPayment)); }

    partial void createAfterPaymentGroup(IServiceProvider sp)
    {
        _AfterPayment = new AfterPaymentGroup
        (
            source.AddGroup(nameof(AfterPayment), ResourceAccess.AllowAnonymous()),
            sp
        );
    }
}