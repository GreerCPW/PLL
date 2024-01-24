// Generated Code
namespace XTI_PllAppClient;
public sealed partial class CustomerCaseGroup : AppClientGroup
{
    public CustomerCaseGroup(IHttpClientFactory httpClientFactory, XtiTokenAccessor xtiTokenAccessor, AppClientUrl clientUrl, AppClientOptions options) : base(httpClientFactory, xtiTokenAccessor, clientUrl, options, "CustomerCase")
    {
        Actions = new CustomerCaseGroupActions(GetCaseDetail: CreatePostAction<GetCaseRequest, CaseDetailModel>("GetCaseDetail"), StartCasePayment: CreatePostAction<StartCasePaymentRequest, PaymentTransactionModel>("StartCasePayment"), UploadMapImage: CreatePostAction<UploadMapImageRequest, EmptyActionResult>("UploadMapImage"));
    }

    public CustomerCaseGroupActions Actions { get; }

    public Task<CaseDetailModel> GetCaseDetail(GetCaseRequest model, CancellationToken ct = default) => Actions.GetCaseDetail.Post("", model, ct);
    public Task<PaymentTransactionModel> StartCasePayment(StartCasePaymentRequest model, CancellationToken ct = default) => Actions.StartCasePayment.Post("", model, ct);
    public Task<EmptyActionResult> UploadMapImage(UploadMapImageRequest model, CancellationToken ct = default) => Actions.UploadMapImage.Post("", model, ct);
    public sealed record CustomerCaseGroupActions(AppClientPostAction<GetCaseRequest, CaseDetailModel> GetCaseDetail, AppClientPostAction<StartCasePaymentRequest, PaymentTransactionModel> StartCasePayment, AppClientPostAction<UploadMapImageRequest, EmptyActionResult> UploadMapImage);
}