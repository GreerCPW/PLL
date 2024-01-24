namespace CPW_PllDB.EF;

public sealed class EfCasePaymentTransaction
{
    private readonly PllDbContext db;
    private readonly CasePaymentTransactionEntity transaction;

    public EfCasePaymentTransaction(PllDbContext db, CasePaymentTransactionEntity transaction)
    {
        this.db = db;
        this.transaction = transaction;
    }

    public Task<EfCase> GetCase() => new EfCases(db).GetCase(transaction.CaseID);

    public Task<EfCasePaymentTransaction> Refresh() => new EfCasePaymentTransactions(db).GetTransaction(transaction.ID);

    public Task<EfCasePaymentTransactionFee> AddFee(long feeID, decimal amount) =>
        new EfCasePaymentTransactionFees(db).Add(transaction.ID, feeID, amount);

    public Task PaymentReceived(decimal amountReceived, string gatewayID) =>
        db.CasePaymentTransactions.Update
        (
            transaction,
            t =>
            {
                t.AmountReceived = amountReceived;
                t.TimeProcessed = DateTimeOffset.Now;
                t.GatewayID = gatewayID;
            }
        );


    public Task<EfCasePaymentTransactionFee[]> GetFees() =>
        new EfCasePaymentTransactionFees(db).GetFees(transaction.ID);

    public PaymentTransactionModel ToModel() =>
        new PaymentTransactionModel
        (
            ID: transaction.ID,
            TransactionKey: transaction.TransactionKey,
            AmountReceived: transaction.AmountReceived,
            TimeStarted: transaction.TimeStarted,
            TimeProcessed: transaction.TimeProcessed,
            GatewayID: transaction.GatewayID
        );
}
