// Generated Code
namespace PllWebApp.ApiControllers;
[AllowAnonymous]
public sealed partial class AfterPaymentController : Controller
{
    private readonly PllAppApi api;
    public AfterPaymentController(PllAppApi api)
    {
        this.api = api;
    }

    [HttpPost]
    public Task<ResultContainer<ReceiptModel>> GetReceipt([FromBody] GetReceiptRequest model, CancellationToken ct)
    {
        return api.Group("AfterPayment").Action<GetReceiptRequest, ReceiptModel>("GetReceipt").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<ReceiptModel>> WaitForReceipt([FromBody] GetReceiptRequest model, CancellationToken ct)
    {
        return api.Group("AfterPayment").Action<GetReceiptRequest, ReceiptModel>("WaitForReceipt").Execute(model, ct);
    }
}