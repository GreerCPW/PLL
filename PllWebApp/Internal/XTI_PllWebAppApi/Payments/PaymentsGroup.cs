namespace XTI_PllWebAppApi.Payments;

public sealed class PaymentsGroup : AppApiGroupWrapper
{
    public PaymentsGroup(AppApiGroup source, IServiceProvider sp)
        : base(source)
    {
        ApplyPayment = source.AddAction(nameof(ApplyPayment), () => sp.GetRequiredService<ApplyPaymentAction>());
        PaymentReceived = source.AddAction(nameof(PaymentReceived), () => sp.GetRequiredService<PaymentReceivedAction>());
    }

    public AppApiAction<ApplyPaymentRequest, EmptyActionResult> ApplyPayment { get; }
    public AppApiAction<PaymentReceivedRequest, PaymentTransactionDetailModel> PaymentReceived { get; }
}