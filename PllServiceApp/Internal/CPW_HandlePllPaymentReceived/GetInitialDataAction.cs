using CPW_Cityworks.Abstractions;
using Microsoft.Extensions.Caching.Memory;
using XTI_Jobs;

namespace CPW_HandlePllPaymentReceived;

internal sealed class GetInitialDataAction : JobAction<PaymentReceivedData>
{
    private readonly IMemoryCache cache;
    private readonly ICityworksService cwService;

    public GetInitialDataAction(IMemoryCache cache, ICityworksService cwService, TriggeredJobTask task) : base(task)
    {
        this.cache = cache;
        this.cwService = cwService;
    }

    protected override async Task Execute
    (
        CancellationToken stoppingToken,
        TriggeredJobTask task,
        JobActionResultBuilder next,
        PaymentReceivedData data
    )
    {
        const string tenderTypesCacheKey = "cwTenderTypes";
        if (!cache.TryGetValue<CwTenderTypeModel[]>(tenderTypesCacheKey, out var tenderTypes))
        {
            tenderTypes = await cwService.GetTenderTypes(stoppingToken);
            cache.Set(tenderTypesCacheKey, tenderTypes);
        }
        var tenderCode = data.IsChecking ? CwTenderCode.Values.Check : CwTenderCode.Values.CreditCard;
        var tenderType = tenderTypes!.First(t => t.Code.Equals(tenderCode));
        data.TenderTypeID = tenderType.ID;
        next.AddNext(HandlePllPaymentReceivedInfo.PaymentReceived, data);
        const string receivedByCacheKey = "cwReceivedBy";
        if (!cache.TryGetValue<long>(tenderTypesCacheKey, out var receivedByUserID))
        {
            var user = await cwService.GetAdminUser(stoppingToken);
            receivedByUserID = user.ID;
            cache.Set(receivedByCacheKey, receivedByUserID);
        }
        data.ReceivedByUserID = receivedByUserID;
    }
}
