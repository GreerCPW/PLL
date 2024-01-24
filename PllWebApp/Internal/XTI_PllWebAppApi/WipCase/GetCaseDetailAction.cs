namespace XTI_PllWebAppApi.WipCase;

internal sealed class GetCaseDetailAction : AppAction<int, WipCaseDetailModel>
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

    public async Task<WipCaseDetailModel> Execute(int caseID, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efCase = await new EfCases(db).GetCase(caseID);
        efCase.EnsureSameUserID(user.User.ID);
        var businessCaseDetail = await cwService.GetBusinessCaseDetail(efCase.CityworksBusinessCaseID, stoppingToken);
        var roles = await cwService.GetRoles(stoppingToken);
        var caseDetail = await efCase.ToDetailModel(businessCaseDetail, roles);
        return caseDetail;
    }
}
