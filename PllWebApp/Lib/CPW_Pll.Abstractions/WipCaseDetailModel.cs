using CPW_Cityworks.Abstractions;

namespace CPW_Pll.Abstractions;

public sealed record WipCaseDetailModel
(
    WipCaseModel Case,
    BusinessCaseModel BusinessCase,
    CustomerCaseDataGroupModel[] DataGroups,
    WipCasePersonModel[] People,
    CwDocumentLabelModel[] DocumentLabels,
    WipCaseRelatedDocumentModel[] RelatedDocuments,
    string[] ServiceTypes
)
{
    public WipCaseDetailModel()
        : this
        (
            new WipCaseModel(), 
            new BusinessCaseModel(), 
            new CustomerCaseDataGroupModel[0], 
            new WipCasePersonModel[0], 
            new CwDocumentLabelModel[0],
            new WipCaseRelatedDocumentModel[0],
            new string[0]
        )
    {
    }
}
