namespace XTI_PllWebAppApi.CustomerCase;

internal sealed class StartCasePaymentAction : AppAction<StartCasePaymentRequest, PaymentTransactionModel>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public StartCasePaymentAction
    (
        IUserContext userContext,
        PllDbContext db
    )
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<PaymentTransactionModel> Execute(StartCasePaymentRequest startRequest, CancellationToken stoppingToken)
    {
        var userContextModel = await userContext.User();
        var efCase = await new EfCases(db).GetCaseByCityworksID(startRequest.CityworksCaseID);
        efCase.EnsureSameUserID(userContextModel.User.ID);
        var efTransaction = await db.Transaction(() => AddPaymentTransaction(efCase.ToModel().ID, startRequest));
        var transactionModel = efTransaction.ToModel();
        return transactionModel;
    }

    private async Task<EfCasePaymentTransaction> AddPaymentTransaction(int caseID, StartCasePaymentRequest startRequest)
    {
        var efTransaction = await new EfCasePaymentTransactions(db).AddTransaction(caseID);
        foreach (var fee in startRequest.Fees)
        {
            await efTransaction.AddFee(fee.FeeID, fee.Amount);
        }
        return efTransaction;
    }
}
