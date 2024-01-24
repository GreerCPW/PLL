namespace XTI_PllWebAppApi.AfterPayment;

public sealed class AfterPaymentGroup : AppApiGroupWrapper
{
    public AfterPaymentGroup(AppApiGroup source, IServiceProvider sp)
        : base(source)
    {
        GetReceipt = source.AddAction(nameof(GetReceipt), () => sp.GetRequiredService<GetReceiptAction>());
        WaitForReceipt = source.AddAction(nameof(WaitForReceipt), () => sp.GetRequiredService<WaitForReceiptAction>());
    }

    public AppApiAction<GetReceiptRequest, ReceiptModel> GetReceipt { get; }
    public AppApiAction<GetReceiptRequest, ReceiptModel> WaitForReceipt { get; }
}