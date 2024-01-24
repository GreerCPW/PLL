using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi.CustomerCase;

public sealed class CustomerCaseGroup : AppApiGroupWrapper
{
    public CustomerCaseGroup(AppApiGroup source, IServiceProvider sp)
        : base(source)
    {
        GetCaseDetail = source.AddAction(nameof(GetCaseDetail), () => sp.GetRequiredService<GetCaseDetailAction>());
        StartCasePayment = source.AddAction(nameof(StartCasePayment), () => sp.GetRequiredService<StartCasePaymentAction>());
        UploadMapImage = source.AddAction(nameof(UploadMapImage), () => sp.GetRequiredService<UploadMapImageAction>());
    }

    public AppApiAction<GetCaseRequest, CaseDetailModel> GetCaseDetail { get; }
    public AppApiAction<StartCasePaymentRequest, PaymentTransactionModel> StartCasePayment { get; }
    public AppApiAction<UploadMapImageRequest, EmptyActionResult> UploadMapImage { get; }
}