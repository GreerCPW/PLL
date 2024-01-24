using CPW_Cityworks.Abstractions;

namespace CPW_Pll.Abstractions;

public sealed record CustomerCaseDataGroupModel
(
    int ID,
    CaseDataGroupDefinitionModel DataGroupDefinition,
    long CityworksID,
    string ServiceType,
    CustomerCaseDataGroupDetailModel[] Details
)
{
    public CustomerCaseDataGroupModel()
        : this(0, new CaseDataGroupDefinitionModel(), 0, "", new CustomerCaseDataGroupDetailModel[0])
    {
    }
}
