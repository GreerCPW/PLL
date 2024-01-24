// Generated Code
namespace XTI_PllAppClient;
public sealed partial class AfterPaymentGroup : AppClientGroup
{
    public AfterPaymentGroup(IHttpClientFactory httpClientFactory, XtiTokenAccessor xtiTokenAccessor, AppClientUrl clientUrl, AppClientOptions options) : base(httpClientFactory, xtiTokenAccessor, clientUrl, options, "AfterPayment")
    {
        Actions = new AfterPaymentGroupActions(GetReceipt: CreatePostAction<GetReceiptRequest, ReceiptModel>("GetReceipt"), WaitForReceipt: CreatePostAction<GetReceiptRequest, ReceiptModel>("WaitForReceipt"));
    }

    public AfterPaymentGroupActions Actions { get; }

    public Task<ReceiptModel> GetReceipt(GetReceiptRequest model, CancellationToken ct = default) => Actions.GetReceipt.Post("", model, ct);
    public Task<ReceiptModel> WaitForReceipt(GetReceiptRequest model, CancellationToken ct = default) => Actions.WaitForReceipt.Post("", model, ct);
    public sealed record AfterPaymentGroupActions(AppClientPostAction<GetReceiptRequest, ReceiptModel> GetReceipt, AppClientPostAction<GetReceiptRequest, ReceiptModel> WaitForReceipt);
}