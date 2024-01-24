namespace XTI_PllWebAppApi.WipCase;

internal sealed class ResetCasePersonAction : AppAction<int, CustomerPersonModel>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public ResetCasePersonAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<CustomerPersonModel> Execute(int model, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efPerson = await new EfPeople(db).AddOrUpdateNobody();
        var personModel = efPerson.ToModel();
        var efCasePerson = await new EfCasePeople(db).GetCasePerson(model);
        var efCase = await efCasePerson.GetCase();
        efCase.EnsureSameUserID(user.User.ID);
        await efCasePerson.UpdatePerson(personModel.ID);
        return personModel;
    }
}
