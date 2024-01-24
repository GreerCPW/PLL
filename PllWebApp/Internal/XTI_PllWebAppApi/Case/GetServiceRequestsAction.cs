using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi.Case;

internal sealed class GetServiceRequestsAction : AppAction<GetSrvReqsRequest, ServiceRequestModel[]>
{
    private readonly ICityworksService cwService;

    public GetServiceRequestsAction(ICityworksService cwService)
    {
        this.cwService = cwService;
    }

    public Task<ServiceRequestModel[]> Execute(GetSrvReqsRequest getRequest, CancellationToken stoppingToken) =>
        cwService.GetServiceRequests(getRequest, stoppingToken);
}
