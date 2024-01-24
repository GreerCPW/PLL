// Generated Code
namespace PllWebApp.ApiControllers;
[Authorize]
public sealed partial class PaymentsController : Controller
{
    private readonly PllAppApi api;
    public PaymentsController(PllAppApi api)
    {
        this.api = api;
    }

    [HttpPost]
    public Task<ResultContainer<EmptyActionResult>> ApplyPayment([FromBody] ApplyPaymentRequest model, CancellationToken ct)
    {
        return api.Group("Payments").Action<ApplyPaymentRequest, EmptyActionResult>("ApplyPayment").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<PaymentTransactionDetailModel>> PaymentReceived([FromBody] PaymentReceivedRequest model, CancellationToken ct)
    {
        return api.Group("Payments").Action<PaymentReceivedRequest, PaymentTransactionDetailModel>("PaymentReceived").Execute(model, ct);
    }
}