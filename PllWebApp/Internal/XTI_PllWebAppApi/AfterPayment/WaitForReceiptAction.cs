namespace XTI_PllWebAppApi.AfterPayment;

internal sealed class WaitForReceiptAction : AppAction<GetReceiptRequest, ReceiptModel>
{
    private readonly PllDbContext db;
    private readonly ICityworksService cwService;

    public WaitForReceiptAction(PllDbContext db, ICityworksService cwService)
    {
        this.db = db;
        this.cwService = cwService;
    }

    public Task<ReceiptModel> Execute(GetReceiptRequest model, CancellationToken stoppingToken) =>
        new Receipt(db, cwService, model.TransactionKey).Value(TimeSpan.FromSeconds(90), stoppingToken);
}
