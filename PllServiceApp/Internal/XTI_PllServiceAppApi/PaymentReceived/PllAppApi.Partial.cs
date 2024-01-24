using XTI_PllServiceAppApi.PaymentReceived;

namespace XTI_PllServiceAppApi;

partial class PllAppApi
{
    private PaymentReceivedGroup? _PaymentReceived;

    public PaymentReceivedGroup PaymentReceived { get => _PaymentReceived ?? throw new ArgumentNullException(nameof(_PaymentReceived)); }

    partial void createPaymentReceivedGroup(IServiceProvider sp)
    {
        _PaymentReceived = new PaymentReceivedGroup
        (
            source.AddGroup(nameof(PaymentReceived)),
            sp
        );
    }
}