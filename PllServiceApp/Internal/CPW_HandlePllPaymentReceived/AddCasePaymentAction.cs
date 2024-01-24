using CPW_Cityworks.Abstractions;
using XTI_Jobs;

namespace CPW_HandlePllPaymentReceived;

internal sealed class AddCasePaymentAction : JobAction<PaymentReceivedFeeData>
{
    private readonly ICityworksService cwService;

    public AddCasePaymentAction(ICityworksService cwService, TriggeredJobTask task) : base(task)
    {
        this.cwService = cwService;
    }

    protected override async Task Execute
    (
        CancellationToken stoppingToken, 
        TriggeredJobTask task, 
        JobActionResultBuilder next,
        PaymentReceivedFeeData data
    )
    {
        var payment = await cwService.AddPayment
        (
            new AddCasePaymentRequest
            {
                CaseFeeID = data.CityworksFeeID,
                CaseID = data.CityworksCaseID,
                AmountPaid = data.Amount,
                TimePaid = DateTimeOffset.Now,
                TenderTypeID = data.TenderTypeID,
                ReceivedByUserID = data.ReceivedByUserID
            },
            stoppingToken
        );
        data.CityworksPaymentID = payment.ID;
        next.AddNext(HandlePllPaymentReceivedInfo.ApplyPayment, data);
    }
}
