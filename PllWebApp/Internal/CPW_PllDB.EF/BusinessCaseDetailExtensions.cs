using CPW_Cityworks.Abstractions;

namespace CPW_PllDB.EF;

public static class BusinessCaseDetailExtensions
{
    public static CwDocumentLabelModel[] GetDocumentLabels(this BusinessCaseDetailModel businessCaseDetail)=>
        businessCaseDetail.DocumentLabels
            .Union(new[] { new CwDocumentLabelModel(0, "Other") })
            .ToArray();
}
