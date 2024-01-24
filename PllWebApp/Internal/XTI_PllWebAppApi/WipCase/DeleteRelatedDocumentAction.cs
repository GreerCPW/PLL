using XTI_Core;

namespace XTI_PllWebAppApi.WipCase;

internal sealed class DeleteRelatedDocumentAction : AppAction<int, EmptyActionResult>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;
    private readonly AppDataFolder appDataFolder;

    public DeleteRelatedDocumentAction(IUserContext userContext, PllDbContext db, AppDataFolder appDataFolder)
    {
        this.userContext = userContext;
        this.db = db;
        this.appDataFolder = appDataFolder;
    }

    public async Task<EmptyActionResult> Execute(int relatedDocumentID, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efRelatedDocument = await new EfCaseRelatedDocuments(db).RelatedDocument(relatedDocumentID);
        var efCase = await efRelatedDocument.GetCase();
        efCase.EnsureSameUserID(user.User.ID);
        await efRelatedDocument.Delete();
        return new EmptyActionResult();
    }
}
