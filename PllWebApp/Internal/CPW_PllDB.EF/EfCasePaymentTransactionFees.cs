using Microsoft.EntityFrameworkCore;

namespace CPW_PllDB.EF;

public sealed class EfCasePaymentTransactionFees
{
    private readonly PllDbContext db;

    public EfCasePaymentTransactionFees(PllDbContext db)
    {
        this.db = db;
    }

    public async Task<EfCasePaymentTransactionFee> Add(int transactionID, long feeID, decimal amount)
    {
        var fee = new CasePaymentTransactionFeeEntity
        {
            TransactionID = transactionID,
            CityworksFeeID = feeID,
            FeeAmount = amount
        };
        await db.CasePaymentTransactionFees.Create(fee);
        return new EfCasePaymentTransactionFee(db, fee);
    }

    public async Task<EfCasePaymentTransactionFee[]> GetFees(int transactionID)
    {
        var transactions = await db.CasePaymentTransactionFees.Retrieve()
            .Where(f => f.TransactionID == transactionID)
            .ToArrayAsync();
        return transactions.Select(t => new EfCasePaymentTransactionFee(db, t)).ToArray();
    }

    public async Task<EfCasePaymentTransactionFee> GetFee(int feeID)
    {
        var transaction = await db.CasePaymentTransactionFees.Retrieve()
            .Where(f => f.ID == feeID)
            .FirstAsync();
        return new EfCasePaymentTransactionFee(db, transaction);
    }
}
