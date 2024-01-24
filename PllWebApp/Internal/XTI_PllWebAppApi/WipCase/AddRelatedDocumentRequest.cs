using Microsoft.AspNetCore.Http;

namespace XTI_PllWebAppApi.WipCase;

public sealed class AddRelatedDocumentRequest
{
    public int CaseID { get; set; }
    public long CityworksLabelID { get; set; }
    public IFormFile? File { get; set; }
}
