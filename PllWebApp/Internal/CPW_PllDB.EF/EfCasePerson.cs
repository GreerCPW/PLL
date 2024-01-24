using CPW_Cityworks.Abstractions;

namespace CPW_PllDB.EF;

public sealed class EfCasePerson
{
    private readonly PllDbContext db;
    private readonly CasePersonEntity casePerson;

    internal EfCasePerson(PllDbContext db, CasePersonEntity casePerson)
    {
        this.db = db;
        this.casePerson = casePerson;
    }

    public Task UpdatePerson(int personID) =>
        db.CasePersons.Update(casePerson, cp => cp.PersonID = personID);

    public Task<EfCase> GetCase() => new EfCases(db).GetCase(casePerson.CaseID);

    public async Task<WipCasePersonModel> ToModel(CaseRoleModel[] roles)
    {
        var role = roles.First(r => r.ID == casePerson.CityworksRoleID);
        var efPerson = await new EfPeople(db).GetPerson(casePerson.PersonID);
        return new WipCasePersonModel
        (
            ID: casePerson.ID,
            Person: efPerson.ToModel(),
            Role: role,
            CityworksID: casePerson.CityworksID
        );
    }
}
