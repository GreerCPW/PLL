using CPW_Gis.Abstractions;
using XTI_PllWebAppApi;
using XTI_GisAppClient;

namespace CPW_PllImplementations;

internal sealed class DefaultGisService : IGisService
{
    private readonly GisAppClient gisClient;

    public DefaultGisService(GisAppClient gisClient)
    {
        this.gisClient = gisClient;
    }

    public Task<AddressCandidateModel[]> Geocode(string singleLineAddress, CancellationToken ct) =>
        gisClient.Geocode.GeocodeAddressWithGreerCpwLocator(singleLineAddress, ct);

    public async Task<string> ReverseGeocode(LatLongCoordinates coordinates, CancellationToken ct)
    {
        string address;
        var parcel = await gisClient.Geocode.GetParcelByLatLong(coordinates, ct);
        if (string.IsNullOrWhiteSpace(parcel.Street))
        {
            address = await gisClient.Geocode.ReverseGeocodeLatLongWithGreerCpwLocator(coordinates, ct);
        }
        else
        {
            address = $"{parcel.Street}, {parcel.City}, {parcel.State}, {parcel.Zip}";
        }
        return address;
    }

    public Task<GisCoordinates> TransformLatLong(LatLongCoordinates latLong, CancellationToken ct) =>
        gisClient.Transformations.TransformWgs1984ToScStatePlane(new GisCoordinates( latLong.Longitude, latLong.Latitude), ct);
}
