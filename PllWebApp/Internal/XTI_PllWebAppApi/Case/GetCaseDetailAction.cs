using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi.Case;

internal sealed class GetCaseDetailAction : AppAction<GetCaseRequest, CaseDetailModel>
{
    private readonly ICityworksService cwService;

    public GetCaseDetailAction(ICityworksService cwService)
    {
        this.cwService = cwService;
    }

    public Task<CaseDetailModel> Execute(GetCaseRequest getRequest, CancellationToken stoppingToken)=>
        cwService.GetCaseDetail(getRequest.CaseID, stoppingToken);
}
