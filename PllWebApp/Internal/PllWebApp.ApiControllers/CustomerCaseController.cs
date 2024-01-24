// Generated Code
namespace PllWebApp.ApiControllers;
[Authorize]
public sealed partial class CustomerCaseController : Controller
{
    private readonly PllAppApi api;
    public CustomerCaseController(PllAppApi api)
    {
        this.api = api;
    }

    [HttpPost]
    public Task<ResultContainer<CaseDetailModel>> GetCaseDetail([FromBody] GetCaseRequest model, CancellationToken ct)
    {
        return api.Group("CustomerCase").Action<GetCaseRequest, CaseDetailModel>("GetCaseDetail").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<PaymentTransactionModel>> StartCasePayment([FromBody] StartCasePaymentRequest model, CancellationToken ct)
    {
        return api.Group("CustomerCase").Action<StartCasePaymentRequest, PaymentTransactionModel>("StartCasePayment").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<EmptyActionResult>> UploadMapImage([FromBody] UploadMapImageRequest model, CancellationToken ct)
    {
        return api.Group("CustomerCase").Action<UploadMapImageRequest, EmptyActionResult>("UploadMapImage").Execute(model, ct);
    }
}