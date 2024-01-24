namespace XTI_PllWebAppApi.Payments;

internal sealed class ApplyPaymentAction : AppAction<ApplyPaymentRequest, EmptyActionResult>
{
    private readonly PllDbContext db;

    public ApplyPaymentAction(PllDbContext db)
    {
        this.db = db;
    }

    public async Task<EmptyActionResult> Execute(ApplyPaymentRequest applyRequest, CancellationToken stoppingToken)
    {
        var efFee = await new EfCasePaymentTransactionFees(db).GetFee(applyRequest.TransactionFeeID);
        await efFee.ApplyPayment(applyRequest.CityworksPaymentID, applyRequest.AmountPaid);
        return new EmptyActionResult();
    }
}
