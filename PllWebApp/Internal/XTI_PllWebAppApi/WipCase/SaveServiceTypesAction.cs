namespace XTI_PllWebAppApi.WipCase;

internal sealed class SaveServiceTypesAction : AppAction<SaveServiceTypesRequest, EmptyActionResult>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public SaveServiceTypesAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<EmptyActionResult> Execute(SaveServiceTypesRequest saveRequest, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efCase = await new EfCases(db).GetCase(saveRequest.CaseID);
        efCase.EnsureSameUserID(user.User.ID);
        await db.Transaction(() => efCase.UpdateServiceTypes(saveRequest.ServiceTypes));
        return new EmptyActionResult();
    }
}
