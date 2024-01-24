using CPW_Gis.Abstractions;

namespace XTI_PllWebAppApi.WipCase;

internal sealed class SaveMapLocationAction : AppAction<SaveMapLocationRequest, WipCaseModel>
{
    private readonly IUserContext userContext;
    private readonly PllDbContext db;
    private readonly IGisService gisService;

    public SaveMapLocationAction(IUserContext userContext, PllDbContext db, IGisService gisService)
    {
        this.userContext = userContext;
        this.db = db;
        this.gisService = gisService;
    }

    public async Task<WipCaseModel> Execute(SaveMapLocationRequest model, CancellationToken stoppingToken)
    {
        var user = await userContext.User();
        var efCase = await new EfCases(db).GetCase(model.CaseID);
        efCase.EnsureSameUserID(user.User.ID);
        var latLong = new LatLongCoordinates(model.Latitude, model.Longitude);
        var address = await gisService.ReverseGeocode(latLong, stoppingToken);
        var coordinates = await gisService.TransformLatLong(latLong, stoppingToken);
        await efCase.UpdateLocation(address, coordinates.X, coordinates.Y);
        return efCase.ToModel();
    }
}
