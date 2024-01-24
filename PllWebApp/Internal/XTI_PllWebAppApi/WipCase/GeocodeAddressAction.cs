using CPW_Gis.Abstractions;

namespace XTI_PllWebAppApi.WipCase;

internal sealed class GeocodeAddressAction : AppAction<string, AddressCandidateModel[]>
{
    private readonly IGisService gisService;

    public GeocodeAddressAction(IGisService gisService)
    {
        this.gisService = gisService;
    }

    public Task<AddressCandidateModel[]> Execute(string address, CancellationToken stoppingToken) =>
        gisService.Geocode(address, stoppingToken);
}