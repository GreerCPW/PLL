namespace CPW_Pll.Abstractions;

public sealed record CustomerPersonModel
(
    int ID,
    string PersonKey,
    string PersonName,
    string CellPhone,
    string Email
)
{
    public CustomerPersonModel()
        : this(0, "", "", "", "")
    {
    }
}
