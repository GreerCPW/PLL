using XTI_PllWebAppApi
    .Payments;

namespace XTI_PllWebAppApi;

partial class PllAppApi
{
    private PaymentsGroup? _Payments;

    public PaymentsGroup Payments { get => _Payments ?? throw new ArgumentNullException(nameof(_Payments)); }

    partial void createPaymentsGroup(IServiceProvider sp)
    {
        _Payments = new PaymentsGroup
        (
            source.AddGroup(nameof(Payments)),
            sp
        );
    }
}