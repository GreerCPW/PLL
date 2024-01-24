namespace CPW_HandlePllPaymentReceived;

public interface IPllService
{
    Task<PaymentTransactionDetailModel> PaymentReceived(PaymentReceivedRequest request, CancellationToken ct);

    Task ApplyPayment(ApplyPaymentRequest applyRequest, CancellationToken ct);
}
