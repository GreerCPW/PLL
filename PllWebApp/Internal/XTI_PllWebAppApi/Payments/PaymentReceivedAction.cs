namespace XTI_PllWebAppApi.Payments;

internal sealed class PaymentReceivedAction : AppAction<PaymentReceivedRequest, PaymentTransactionDetailModel>
{
    private readonly PllDbContext db;

    public PaymentReceivedAction(PllDbContext db)
    {
        this.db = db;
    }

    public async Task<PaymentTransactionDetailModel> Execute(PaymentReceivedRequest model, CancellationToken ct)
    {
        var efTransaction = await new EfCasePaymentTransactions(db).GetTransaction(model.TransactionID);
        await efTransaction.PaymentReceived(model.AmountReceived, model.GatewayID);
        var efCase = await efTransaction.GetCase();
        var efFees = await efTransaction.GetFees();
        return new PaymentTransactionDetailModel
        (
            CityworksCaseID: efCase.ToModel().CityworksID,
            Transaction: efTransaction.ToModel(),
            Fees: efFees.Select(f => f.ToModel()).ToArray()
        );
    }
}