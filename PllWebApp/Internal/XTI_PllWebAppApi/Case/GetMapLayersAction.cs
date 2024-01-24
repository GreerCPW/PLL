using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi.Case;

internal sealed class GetMapLayersAction : AppAction<long, CwMapLayerModel[]>
{
    private readonly ICityworksService cwService;

    public GetMapLayersAction(ICityworksService cwService)
    {
        this.cwService = cwService;
    }

    public Task<CwMapLayerModel[]> Execute(long caseID, CancellationToken stoppingToken) =>
        cwService.GetCaseMapLayers(caseID, stoppingToken);
}
