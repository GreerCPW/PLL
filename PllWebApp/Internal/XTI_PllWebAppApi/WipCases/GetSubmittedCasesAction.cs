namespace XTI_PllWebAppApi.WipCases;

internal sealed class GetSubmittedCasesAction : AppAction<EmptyRequest, WipCaseModel[]>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public GetSubmittedCasesAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<WipCaseModel[]> Execute(EmptyRequest model, CancellationToken stoppingToken)
    {
        var userContextModel = await userContext.User();
        var efCases = await new EfCases(db).GetSubmittedCases(userContextModel.User.ID);
        return efCases.Select(c => c.ToModel()).ToArray();
    }
}
