namespace XTI_PllWebAppApi.WipCase;

internal sealed class DownloadRelatedDocumentAction : AppAction<int, WebFileResult>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;

    public DownloadRelatedDocumentAction(IUserContext userContext, PllDbContext db)
    {
        this.userContext = userContext;
        this.db = db;
    }

    public async Task<WebFileResult> Execute(int relatedDocumentID, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efRelatedDocument = await new EfCaseRelatedDocuments(db).RelatedDocument(relatedDocumentID);
        var efCase = await efRelatedDocument.GetCase();
        efCase.EnsureSameUserID(user.User.ID);
        var fileResult = await efRelatedDocument.Download();
        return fileResult;
    }
}
