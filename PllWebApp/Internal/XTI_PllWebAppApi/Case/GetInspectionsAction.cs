using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi.Case;

internal sealed class GetInspectionsAction : AppAction<GetInspectionsRequest, InspectionModel[]>
{
    private readonly ICityworksService cwService;

    public GetInspectionsAction(ICityworksService cwService)
    {
        this.cwService = cwService;
    }

    public Task<InspectionModel[]> Execute(GetInspectionsRequest getRequest, CancellationToken stoppingToken) =>
        cwService.GetInspections(getRequest, stoppingToken);
}
