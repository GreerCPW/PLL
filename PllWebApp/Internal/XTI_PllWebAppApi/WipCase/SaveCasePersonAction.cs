namespace XTI_PllWebAppApi.WipCase;

internal sealed class SaveCasePersonAction : AppAction<SaveWipCasePersonRequest, CustomerPersonModel>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public SaveCasePersonAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<CustomerPersonModel> Execute(SaveWipCasePersonRequest saveRequest, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efPerson = await new EfPeople(db).GetPerson(saveRequest.PersonID);
        efPerson.EnsureSameUserID(user.User.ID);
        var personModel = efPerson.ToModel();
        var efCasePerson = await new EfCasePeople(db).GetCasePerson(saveRequest.CasePersonID);
        var efCase = await efCasePerson.GetCase();
        efCase.EnsureSameUserID(user.User.ID);
        await efCasePerson.UpdatePerson(personModel.ID);
        return personModel;
    }
}
