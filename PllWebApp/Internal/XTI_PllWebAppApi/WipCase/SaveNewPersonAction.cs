namespace XTI_PllWebAppApi.WipCase;

internal sealed class SaveNewPersonAction : AppAction<SaveNewPersonRequest, CustomerPersonModel>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public SaveNewPersonAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<CustomerPersonModel> Execute(SaveNewPersonRequest saveRequest, CancellationToken stoppingToken)
    {
        var efCasePerson = await new EfCasePeople(db).GetCasePerson(saveRequest.CasePersonID);
        var efCase = await efCasePerson.GetCase();
        var user = await userContext.User();
        efCase.EnsureSameUserID(user.User.ID);
        var personModel = await db.Transaction(() => AddCasePerson(saveRequest, efCasePerson, user.User.ID));
        return personModel;
    }

    private async Task<CustomerPersonModel> AddCasePerson(SaveNewPersonRequest saveRequest, EfCasePerson efCasePerson, int userID)
    {
        var efPerson = await new EfPeople(db).Add
        (
            userID: userID,
            personName: saveRequest.PersonName,
            cellPhone: saveRequest.CellPhone,
            email: saveRequest.Email
        );
        var personModel = efPerson.ToModel();
        await efCasePerson.UpdatePerson(personModel.ID);
        return personModel;
    }
}
