using CPW_Cityworks.Abstractions;

namespace CPW_Pll.Abstractions;

public sealed record WipCasePersonModel
(
    int ID,
    CustomerPersonModel Person,
    CaseRoleModel Role,
    long CityworksID
)
{
    public WipCasePersonModel()
        : this(0, new CustomerPersonModel(), new CaseRoleModel(), 0)
    {
    }
}
