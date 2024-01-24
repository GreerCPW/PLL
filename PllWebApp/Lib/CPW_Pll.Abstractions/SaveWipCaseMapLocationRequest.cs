namespace CPW_Pll.Abstractions;

public sealed class SaveMapLocationRequest
{
    public int CaseID { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
}
