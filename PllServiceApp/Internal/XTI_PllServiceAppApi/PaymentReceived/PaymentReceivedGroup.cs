namespace XTI_PllServiceAppApi.PaymentReceived;

public sealed class PaymentReceivedGroup : AppApiGroupWrapper
{
    public PaymentReceivedGroup(AppApiGroup source, IServiceProvider sp)
        : base(source)
    {
        HandlePaymentReceived = source.AddAction
        (
            nameof(HandlePaymentReceived), 
            () => sp.GetRequiredService<HandlePaymentReceivedAction>()
        );
    }

    public AppApiAction<EmptyRequest, EmptyActionResult> HandlePaymentReceived { get; }
}