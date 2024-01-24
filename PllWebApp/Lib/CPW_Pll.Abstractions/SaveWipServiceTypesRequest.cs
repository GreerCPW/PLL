namespace CPW_Pll.Abstractions;

public sealed class SaveServiceTypesRequest
{
    public int CaseID { get; set; }
    public string[] ServiceTypes { get; set; } = new string[0];
}
