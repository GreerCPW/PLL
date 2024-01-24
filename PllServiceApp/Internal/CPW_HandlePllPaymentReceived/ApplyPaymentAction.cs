using XTI_Jobs;

namespace CPW_HandlePllPaymentReceived;

internal sealed class ApplyPaymentAction : JobAction<PaymentReceivedFeeData>
{
    private readonly IPllService customerService;

    public ApplyPaymentAction(IPllService customerService, TriggeredJobTask task) : base(task)
    {
        this.customerService = customerService;
    }

    protected override Task Execute
    (
        CancellationToken stoppingToken,
        TriggeredJobTask task,
        JobActionResultBuilder next,
        PaymentReceivedFeeData data
    ) =>
        customerService.ApplyPayment
        (
            new ApplyPaymentRequest
            {
                TransactionFeeID = data.TransactionFeeID,
                AmountPaid = data.Amount,
                CityworksPaymentID = data.CityworksPaymentID
            },
            stoppingToken
        );
}
