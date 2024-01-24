namespace CPW_PllDB;

public sealed class PersonEntity
{
    public int ID { get; set; }
    public int UserID { get; set; }
    public string PersonKey { get; set; } = "";
    public string PersonName { get; set; } = "";
    public string CellPhone { get; set; } = "";
    public string Email { get; set; } = "";
}
