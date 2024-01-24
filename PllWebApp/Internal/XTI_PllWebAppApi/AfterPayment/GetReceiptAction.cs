using CPW_PllDB;

namespace XTI_PllWebAppApi.AfterPayment;

internal sealed class GetReceiptAction : AppAction<GetReceiptRequest, ReceiptModel>
{
    private readonly PllDbContext db;
    private readonly ICityworksService cwService;

    public GetReceiptAction(PllDbContext db, ICityworksService cwService)
    {
        this.db = db;
        this.cwService = cwService;
    }

    public Task<ReceiptModel> Execute(GetReceiptRequest model, CancellationToken stoppingToken) =>
        new Receipt(db, cwService, model.TransactionKey).Value(TimeSpan.Zero, stoppingToken);
}
