namespace XTI_PllWebAppApi.WipCases;

internal sealed class AddCaseAction : AppAction<long, int>
{
    private readonly IUserContext userContext;
    private readonly ICityworksService cwService;
    private readonly PllDbContext db;

    public AddCaseAction(IUserContext userContext, ICityworksService cwService, PllDbContext db)
    {
        this.userContext = userContext;
        this.cwService = cwService;
        this.db = db;
    }

    public async Task<int> Execute(long businessCaseID, CancellationToken stoppingToken)
    {
        var userContextModel = await userContext.User();
        var businessCaseDetail = await cwService.GetBusinessCaseDetail(businessCaseID, stoppingToken);
        var roles = await cwService.GetRoles(stoppingToken);
        var efCase = await db.Transaction(() => new EfCases(db).AddCase(businessCaseDetail, roles, userContextModel.User.ID));
        return efCase.ToModel().ID;
    }
}
