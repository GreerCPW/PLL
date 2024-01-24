namespace CPW_PllDB.EF;

public sealed class EfPerson
{
    private readonly PllDbContext db;
    private readonly PersonEntity person;

    internal EfPerson(PllDbContext db, PersonEntity person)
    {
        this.db = db;
        this.person = person;
    }

    public void EnsureSameUserID(int userID)
    {
        if (userID != person.UserID)
        {
            throw new Exception($"User {userID} does not have access to person {person.ID}.");
        }
    }

    public Task UpdatePerson(string personName, string cellPhone, string email) =>
        db.Persons.Update
        (
            person,
            p =>
            {
                p.PersonName = personName;
                p.CellPhone = cellPhone;
                p.Email = email;
            }
        );

    public CustomerPersonModel ToModel() =>
        new CustomerPersonModel
        (
            person.ID,
            person.PersonKey,
            person.PersonName,
            person.CellPhone,
            person.Email
        );
}
