// Generated Code
namespace XTI_PllAppClient;
public sealed partial class PaymentsGroup : AppClientGroup
{
    public PaymentsGroup(IHttpClientFactory httpClientFactory, XtiTokenAccessor xtiTokenAccessor, AppClientUrl clientUrl, AppClientOptions options) : base(httpClientFactory, xtiTokenAccessor, clientUrl, options, "Payments")
    {
        Actions = new PaymentsGroupActions(ApplyPayment: CreatePostAction<ApplyPaymentRequest, EmptyActionResult>("ApplyPayment"), PaymentReceived: CreatePostAction<PaymentReceivedRequest, PaymentTransactionDetailModel>("PaymentReceived"));
    }

    public PaymentsGroupActions Actions { get; }

    public Task<EmptyActionResult> ApplyPayment(ApplyPaymentRequest model, CancellationToken ct = default) => Actions.ApplyPayment.Post("", model, ct);
    public Task<PaymentTransactionDetailModel> PaymentReceived(PaymentReceivedRequest model, CancellationToken ct = default) => Actions.PaymentReceived.Post("", model, ct);
    public sealed record PaymentsGroupActions(AppClientPostAction<ApplyPaymentRequest, EmptyActionResult> ApplyPayment, AppClientPostAction<PaymentReceivedRequest, PaymentTransactionDetailModel> PaymentReceived);
}