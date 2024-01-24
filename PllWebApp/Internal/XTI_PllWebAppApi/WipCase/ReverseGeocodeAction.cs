using CPW_Gis.Abstractions;

namespace XTI_PllWebAppApi.WipCase;

internal sealed class ReverseGeocodeAction : AppAction<LatLongCoordinates, string>
{
    private readonly IGisService gisService;

    public ReverseGeocodeAction(IGisService gisService)
    {
        this.gisService = gisService;
    }

    public Task<string> Execute(LatLongCoordinates coordinates, CancellationToken stoppingToken) =>
        gisService.ReverseGeocode(coordinates, stoppingToken);
}
