using CPW_HandlePllPaymentReceived;
using CPW_Pll.Abstractions;
using XTI_PllAppClient;

namespace CPW_PllImplementations;

internal sealed class DefaultPllService : IPllService
{
    private readonly PllAppClient pllClient;

    public DefaultPllService(PllAppClient pllClient)
    {
        this.pllClient = pllClient;
    }

    public Task ApplyPayment(ApplyPaymentRequest applyRequest, CancellationToken ct) =>
        pllClient.Payments.ApplyPayment(applyRequest, ct);

    public Task<PaymentTransactionDetailModel> PaymentReceived(PaymentReceivedRequest request, CancellationToken ct) =>
        pllClient.Payments.PaymentReceived(request, ct);
}
