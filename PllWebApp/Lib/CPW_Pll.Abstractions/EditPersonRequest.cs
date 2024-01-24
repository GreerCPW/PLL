namespace CPW_Pll.Abstractions;

public sealed class EditPersonRequest
{
    public int PersonID { get; set; }
    public string PersonName { get; set; } = "";
    public string CellPhone { get; set; } = "";
    public string Email { get; set; } = "";
}
