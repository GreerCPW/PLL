using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi.WipCases;

internal sealed class GetBusinessCasesAction : AppAction<EmptyRequest, BusinessCaseModel[]>
{
    private readonly ICityworksService cwService;

    public GetBusinessCasesAction(ICityworksService cwService)
    {
        this.cwService = cwService;
    }

    public Task<BusinessCaseModel[]> Execute(EmptyRequest model, CancellationToken stoppingToken) =>
        cwService.GetBusinessCases(stoppingToken);
}
