using Microsoft.EntityFrameworkCore;

namespace CPW_PllDB.EF;

public sealed class EfCasePeople
{
    private readonly PllDbContext db;

    public EfCasePeople(PllDbContext db)
    {
        this.db = db;
    }

    public async Task<EfCasePerson> GetCasePerson(int casePersonID)
    {
        var person = await db.CasePersons.Retrieve()
            .Where(cp => cp.ID == casePersonID)
            .FirstAsync();
        return new EfCasePerson(db, person);
    }

    public async Task<EfCasePerson[]> GetCasePersons(CaseEntity caseEntity)
    {
        var persons = await db.CasePersons.Retrieve()
            .Where(cp => cp.CaseID == caseEntity.ID)
            .ToArrayAsync();
        return persons.Select(dg => new EfCasePerson(db, dg)).ToArray();
    }
}
