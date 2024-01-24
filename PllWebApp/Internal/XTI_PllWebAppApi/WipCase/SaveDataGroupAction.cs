namespace XTI_PllWebAppApi.WipCase;

internal sealed class SaveDataGroupAction : AppAction<SaveDataGroupRequest, EmptyActionResult>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public SaveDataGroupAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<EmptyActionResult> Execute(SaveDataGroupRequest model, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        foreach(var detail in model.Details)
        {
            var efDetail = await new EfCaseDataGroupDetails(db).GetDetail(detail.DataGroupDetailID);
            var efCase = await efDetail.GetCase();
            efCase.EnsureSameUserID(user.User.ID);
            await efDetail.UpdateValue(detail.Value);
        }
        return new EmptyActionResult();
    }
}
