namespace CPW_Pll.Abstractions;

public sealed class SaveNewPersonRequest
{
    public int CasePersonID { get; set; }
    public string PersonName { get; set; } = "";
    public string CellPhone { get; set; } = "";
    public string Email { get; set; } = "";
}
