using CPW_Cityworks.Abstractions;

namespace CPW_Pll.Abstractions;

public sealed record CustomerCaseDataGroupDetailModel
(
    int ID,
    CaseDataDetailDefinitionModel DetailDefinition,
    long CityworksID,
    string Value
)
{
    public CustomerCaseDataGroupDetailModel()
        : this(0, new CaseDataDetailDefinitionModel(), 0, "")
    {
    }
}
