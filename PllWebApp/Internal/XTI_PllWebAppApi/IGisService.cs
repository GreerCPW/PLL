using CPW_Gis.Abstractions;

namespace XTI_PllWebAppApi;

public interface IGisService
{
    Task<AddressCandidateModel[]> Geocode(string singleLineAddress, CancellationToken ct);

    Task<string> ReverseGeocode(LatLongCoordinates coordinates, CancellationToken ct);

    Task<GisCoordinates> TransformLatLong(LatLongCoordinates coordinates, CancellationToken ct);
}
