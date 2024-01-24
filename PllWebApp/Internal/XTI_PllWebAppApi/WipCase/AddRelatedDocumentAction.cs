using XTI_Core;

namespace XTI_PllWebAppApi.WipCase;

internal sealed class AddRelatedDocumentAction : AppAction<AddRelatedDocumentRequest, WipCaseRelatedDocumentModel>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;
    private readonly ICityworksService cwService;
    private readonly AppDataFolder appDataFolder;

    public AddRelatedDocumentAction(IUserContext userContext, PllDbContext db, ICityworksService cwService, AppDataFolder appDataFolder)
    {
        this.userContext = userContext;
        this.db = db;
        this.cwService = cwService;
        this.appDataFolder = appDataFolder;
    }

    public async Task<WipCaseRelatedDocumentModel> Execute(AddRelatedDocumentRequest addRequest, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efCase = await new EfCases(db).GetCase(addRequest.CaseID);
        efCase.EnsureSameUserID(user.User.ID);
        var tempDir = appDataFolder.WithSubFolder("CaseDocuments");
        tempDir.TryCreate();
        var efDoc = await efCase.AddRelatedDocument
        (
            addRequest.CityworksLabelID, 
            tempDir.Path(), 
            addRequest.File ?? throw new Exception("File not uploaded.")
        );
        var businessCaseDetail = await cwService.GetBusinessCaseDetail(efCase.CityworksBusinessCaseID, stoppingToken);
        return efDoc.ToModel(businessCaseDetail.GetDocumentLabels());
    }
}
