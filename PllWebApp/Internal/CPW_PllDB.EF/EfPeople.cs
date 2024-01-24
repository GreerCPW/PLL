using Microsoft.EntityFrameworkCore;

namespace CPW_PllDB.EF;

public sealed class EfPeople
{
    private const string NoBody = "NOBODY";
    private readonly PllDbContext db;

    public EfPeople(PllDbContext db)
    {
        this.db = db;
    }

    public async Task<EfPerson> AddOrUpdateNobody()
    {
        var personEntity = await db.Persons.Retrieve().Where(p => p.PersonKey == NoBody).FirstOrDefaultAsync();
        if (personEntity == null)
        {
            personEntity = new PersonEntity
            {
                UserID = 0,
                PersonKey = NoBody
            };
            await db.Persons.Create(personEntity);
        }
        return new EfPerson(db, personEntity);
    }

    public async Task<EfPerson> Add(int userID, string personName, string cellPhone, string email)
    {
        var personEntity = new PersonEntity
        {
            UserID = userID,
            PersonKey = personName,
            PersonName = personName,
            CellPhone = cellPhone,
            Email = email
        };
        await db.Persons.Create(personEntity);
        return new EfPerson(db, personEntity);
    }

    public async Task<EfPerson[]> GetPeople(int userID)
    {
        var people = await db.Persons.Retrieve().Where(p => p.UserID == userID).ToArrayAsync();
        return people.Select(p => new EfPerson(db, p)).ToArray();
    }

    public async Task<EfPerson> GetPerson(int personID)
    {
        var person = await db.Persons.Retrieve().Where(p => p.ID == personID).FirstAsync();
        return new EfPerson(db, person);
    }
}
