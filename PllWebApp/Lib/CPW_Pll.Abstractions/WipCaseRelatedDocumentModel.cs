using CPW_Cityworks.Abstractions;

namespace CPW_Pll.Abstractions;

public sealed record WipCaseRelatedDocumentModel
(
    int ID, 
    string FileName, 
    string Thumbnail, 
    string ContentType,
    CwDocumentLabelModel DocumentLabel, 
    long CityworksID
)
{
    public WipCaseRelatedDocumentModel()
        : this(0, "", "", "", new CwDocumentLabelModel(), 0)
    {
    }
}
