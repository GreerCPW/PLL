namespace CPW_PllDB;

public sealed class CaseRelatedDocumentEntity
{
    public int ID { get; set; }
    public int CaseID { get; set; }
    public string FileName { get; set; } = "";
    public string TempFilePath { get; set; } = "";
    public long CityworksLabelID { get; set; }
    public long CityworksID { get; set; }
}
