namespace XTI_PllWebAppApi.WipCase;

internal sealed class DeleteCaseAction : AppAction<int, EmptyActionResult>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public DeleteCaseAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<EmptyActionResult> Execute(int caseID, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efCase = await new EfCases(db).GetCase(caseID);
        efCase.EnsureSameUserID(user.User.ID);
        await efCase.Delete();
        return new EmptyActionResult();
    }
}
