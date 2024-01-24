namespace CPW_PllDB;

public sealed class CaseDataGroupEntity
{
    public int ID { get; set; }
    public int CaseID { get; set; }
    public long CityworksDataGroupDefinitionID { get; set; }
    public string ServiceType { get; set; } = "";
    public long CityworksID { get; set; }
}
