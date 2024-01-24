namespace XTI_PllWebAppApi.WipCase;

internal sealed class CompleteCustomerCaseAction : AppAction<int, long>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;
    private readonly ICityworksService cwService;

    public CompleteCustomerCaseAction(IUserContext userContext, PllDbContext db, ICityworksService cwService)
    {
        this.userContext = userContext;
        this.db = db;
        this.cwService = cwService;
    }

    public async Task<long> Execute(int caseID, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efCase = await new EfCases(db).GetCase(caseID);
        efCase.EnsureSameUserID(user.User.ID);
        var businessCaseDetail = await cwService.GetBusinessCaseDetail(efCase.CityworksBusinessCaseID, stoppingToken);
        var roles = await cwService.GetRoles(stoppingToken);
        var customerCaseDetail = await efCase.ToDetailModel(businessCaseDetail, roles);
        var cityworksID = customerCaseDetail.Case.CityworksID;
        if(customerCaseDetail.Case.CityworksID == 0)
        {

        }
        return cityworksID;
    }
}
