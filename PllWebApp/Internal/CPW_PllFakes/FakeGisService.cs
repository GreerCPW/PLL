using CPW_Gis.Abstractions;
using XTI_PllWebAppApi;

namespace CPW_PllFakes;

public sealed class FakeGisService : IGisService
{
    private readonly List<AddressCandidateModel> candidates = new();

    public FakeGisService()
    {
        candidates.Add(new AddressCandidateModel("301 McCall St", 1630712.4910496555M, 1131679.2369511409M, 100M));
    }

    public AddressCandidateModel AddAddressCandidate(AddressCandidateModel candidate)
    {
        candidates.Add(candidate);
        return candidate;
    }

    public Task<AddressCandidateModel[]> Geocode(string singleLineAddress, CancellationToken ct) =>
        Task.FromResult(candidates.Where(c => c.Address.Contains(singleLineAddress, StringComparison.OrdinalIgnoreCase)).ToArray());

    public Task<string> ReverseGeocode(LatLongCoordinates coordinates, CancellationToken ct)
    {
        return Task.FromResult("101 Somewhere Ln");
    }

    public Task<GisCoordinates> TransformLatLong(LatLongCoordinates coordinates, CancellationToken ct)
    {
        return Task.FromResult(new GisCoordinates());
    }
}
