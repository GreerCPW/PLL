using Microsoft.EntityFrameworkCore;

namespace CPW_PllDB.EF;

public sealed class EfCasePaymentTransactions
{
    private readonly PllDbContext db;

    public EfCasePaymentTransactions(PllDbContext db)
    {
        this.db = db;
    }

    public async Task<EfCasePaymentTransaction> AddTransaction(int caseID)
    {
        var transaction = new CasePaymentTransactionEntity
        {
            CaseID = caseID,
            TransactionKey = Guid.NewGuid().ToString("D"),
            TimeStarted = DateTimeOffset.Now
        };
        await db.CasePaymentTransactions.Create(transaction);
        return new EfCasePaymentTransaction(db, transaction);
    }

    public async Task<EfCasePaymentTransaction> GetTransaction(int transactionID)
    {
        var transaction = await db.CasePaymentTransactions.Retrieve()
            .Where(t => t.ID == transactionID)
            .FirstOrDefaultAsync();
        return new EfCasePaymentTransaction(db, transaction ?? throw new Exception($"Transaction '{transactionID}' not found."));
    }

    public async Task<EfCasePaymentTransaction> GetTransactionByKey(string transactionKey)
    {
        var transaction = await db.CasePaymentTransactions.Retrieve()
            .Where(t => t.TransactionKey == transactionKey)
            .FirstOrDefaultAsync();
        return new EfCasePaymentTransaction(db, transaction ?? throw new Exception($"Transaction '{transactionKey}' not found."));
    }
}
