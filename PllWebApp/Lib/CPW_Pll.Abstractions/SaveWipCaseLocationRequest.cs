namespace CPW_Pll.Abstractions;

public sealed class SaveLocationRequest
{
    public int CaseID { get; set; }
    public string Location { get; set; } = "";
    public decimal X { get; set; }
    public decimal Y { get; set; }
}
