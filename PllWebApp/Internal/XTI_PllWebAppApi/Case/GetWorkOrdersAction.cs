using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi.Case;

internal sealed class GetWorkOrdersAction : AppAction<GetWorkOrdersRequest, WorkOrderModel[]>
{
    private readonly ICityworksService cwService;

    public GetWorkOrdersAction(ICityworksService cwService)
    {
        this.cwService = cwService;
    }

    public Task<WorkOrderModel[]> Execute(GetWorkOrdersRequest getRequest, CancellationToken stoppingToken) =>
        cwService.GetWorkOrders(getRequest, stoppingToken);
}
