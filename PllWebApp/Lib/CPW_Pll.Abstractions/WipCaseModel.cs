using CPW_Cityworks.Abstractions;

namespace CPW_Pll.Abstractions;

public sealed record WipCaseModel
(
    int ID,
    string Description,
    string Location,
    decimal X,
    decimal Y,
    long CityworksID,
    CaseStatusCode StatusCode,
    DateTimeOffset TimeCreated,
    DateTimeOffset TimeCompleted
)
{
    public WipCaseModel()
        : this(0, "", "", 0, 0, 0, CaseStatusCode.Values.GetDefault(), DateTimeOffset.MaxValue, DateTimeOffset.MaxValue)
    {
    }
}
