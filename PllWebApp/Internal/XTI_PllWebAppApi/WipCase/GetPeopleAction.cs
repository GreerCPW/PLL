namespace XTI_PllWebAppApi.WipCase;

internal sealed class GetPeopleAction : AppAction<EmptyRequest, CustomerPersonModel[]>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public GetPeopleAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<CustomerPersonModel[]> Execute(EmptyRequest model, CancellationToken stoppingToken)
    {
        var userContextModel = await userContext.User();
        var people = await new EfPeople(db).GetPeople(userContextModel.User.ID);
        return people.Select(p => p.ToModel()).ToArray();
    }
}
