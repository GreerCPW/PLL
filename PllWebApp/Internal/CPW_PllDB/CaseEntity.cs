namespace CPW_PllDB;

public sealed class CaseEntity
{
    public int ID { get; set; }
    public int UserID { get; set; }
    public long CityworksBusinessCaseID { get; set; }
    public string Description { get; set; } = "";
    public string Location { get; set; } = "";
    public int CaseStatusCode { get; set; }
    public decimal X { get; set; }
    public decimal Y { get; set; }
    public DateTimeOffset TimeCreated { get; set; } = DateTimeOffset.MaxValue;
    public DateTimeOffset TimeCompleted { get; set; } = DateTimeOffset.MaxValue;
    public DateTimeOffset TimeDeleted { get; set; } = DateTimeOffset.MaxValue;
    public long CityworksID { get; set; }
}