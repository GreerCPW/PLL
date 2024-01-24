using XTI_Jobs.Abstractions;

namespace CPW_HandlePllPaymentReceived;

public static class HandlePllPaymentReceivedInfo
{
    public static readonly JobKey JobKey = new("Handle PLL Payment Received");

    internal static readonly JobTaskKey GetInitialData = new(nameof(GetInitialData));
    internal static readonly JobTaskKey PaymentReceived = new(nameof(PaymentReceived));
    internal static readonly JobTaskKey AddCasePayment = new(nameof(AddCasePayment));
    internal static readonly JobTaskKey ApplyPayment = new(nameof(ApplyPayment));

    public static readonly JobTaskKey[] AllTasks = new[]
    {
        GetInitialData,
        PaymentReceived,
        AddCasePayment,
        ApplyPayment
    };
}