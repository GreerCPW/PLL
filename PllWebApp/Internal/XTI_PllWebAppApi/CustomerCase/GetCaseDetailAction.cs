using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi.CustomerCase;

internal sealed class GetCaseDetailAction : AppAction<GetCaseRequest, CaseDetailModel>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;
    private readonly ICityworksService cwService;

    public GetCaseDetailAction(IUserContext userContext, PllDbContext db, ICityworksService cwService)
    {
        this.userContext = userContext;
        this.db = db;
        this.cwService = cwService;
    }

    public async Task<CaseDetailModel> Execute(GetCaseRequest getRequest, CancellationToken stoppingToken)
    {
        var userContextModel = await userContext.User();
        var efCase = await new EfCases(db).GetCaseByCityworksID(getRequest.CaseID);
        efCase.EnsureSameUserID(userContextModel.User.ID);
        var caseDetail = await cwService.GetCaseDetail(getRequest.CaseID, stoppingToken);
        return caseDetail;
    }
}
