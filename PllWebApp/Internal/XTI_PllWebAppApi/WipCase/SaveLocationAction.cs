namespace XTI_PllWebAppApi.WipCase;

internal sealed class SaveLocationAction : AppAction<SaveLocationRequest, EmptyActionResult>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public SaveLocationAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<EmptyActionResult> Execute(SaveLocationRequest model, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efCase = await new EfCases(db).GetCase(model.CaseID);
        efCase.EnsureSameUserID(user.User.ID);
        await efCase.UpdateLocation(model.Location, model.X, model.Y);
        return new EmptyActionResult();
    }
}
