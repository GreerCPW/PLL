using XTI_Jobs;

namespace CPW_HandlePllPaymentReceived;

internal sealed class PaymentReceivedAction : JobAction<PaymentReceivedData>
{
    private readonly IPllService customerService;

    public PaymentReceivedAction(IPllService customerService, TriggeredJobTask task) : base(task)
    {
        this.customerService = customerService;
    }

    protected override async Task Execute
    (
        CancellationToken stoppingToken, 
        TriggeredJobTask task, 
        JobActionResultBuilder next, 
        PaymentReceivedData data
    )
    {
        var transactionDetail = await customerService.PaymentReceived
        (
            new PaymentReceivedRequest
            {
                TransactionID = data.TransactionID,
                AmountReceived = data.Amount,
                GatewayID = data.GatewayID
            },
            stoppingToken
        );
        var amountReceived = data.Amount;
        foreach(var transactionFee in transactionDetail.Fees)
        {
            var amountPaid = transactionFee.FeeAmount > amountReceived ? amountReceived : transactionFee.FeeAmount;
            var feeData = new PaymentReceivedFeeData
            {
                TransactionFeeID = transactionFee.ID,
                CityworksCaseID = transactionDetail.CityworksCaseID,
                CityworksFeeID = transactionFee.CityworksFeeID,
                TenderTypeID = data.TenderTypeID,
                ReceivedByUserID = data.ReceivedByUserID,
                Amount = amountPaid
            };
            next.AddNext(HandlePllPaymentReceivedInfo.AddCasePayment, feeData);
            amountReceived -= amountPaid;
            if(amountReceived <= 0)
            {
                break;
            }
        }
    }
}
