namespace XTI_PllWebAppApi.WipCase;

internal sealed class EditRelatedDocumentAction : AppAction<EditWipCaseRelatedDocumentRequest, EmptyActionResult>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public EditRelatedDocumentAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<EmptyActionResult> Execute(EditWipCaseRelatedDocumentRequest editRequest, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efRelatedDocument = await new EfCaseRelatedDocuments(db).RelatedDocument(editRequest.RelatedDocumentID);
        var efCase = await efRelatedDocument.GetCase();
        efCase.EnsureSameUserID(user.User.ID);
        await efRelatedDocument.EditCityworksLabel(editRequest.CityworksLabelID);
        return new EmptyActionResult();
    }
}
