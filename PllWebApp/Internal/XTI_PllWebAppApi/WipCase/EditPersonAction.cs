namespace XTI_PllWebAppApi.WipCase;

internal sealed class EditPersonAction : AppAction<EditPersonRequest, CustomerPersonModel>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public EditPersonAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<CustomerPersonModel> Execute(EditPersonRequest model, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efPerson = await new EfPeople(db).GetPerson(model.PersonID);
        efPerson.EnsureSameUserID(user.User.ID);
        await efPerson.UpdatePerson
        (
            personName: model.PersonName, 
            cellPhone: model.CellPhone, 
            email: model.Email
        );
        var personModel = efPerson.ToModel();
        return personModel;
    }
}
