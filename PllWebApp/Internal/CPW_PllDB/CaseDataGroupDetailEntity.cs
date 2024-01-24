namespace CPW_PllDB;

public sealed class CaseDataGroupDetailEntity
{
    public int ID { get; set; }
    public int DataGroupID { get; set; }
    public long CityworksDetailDefinitionID { get; set; }
    public string Value { get; set; } = "";
    public long CityworksID { get; set; }
}
