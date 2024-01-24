using CPW_Cityworks.Abstractions;
using CPW_HandlePllPaymentReceived;
using XTI_CityworksAppClient;

namespace CPW_PllImplementations;

internal sealed class DefaultCityworksService : ICityworksService
{
    private readonly CityworksAppClient cwClient;

    public DefaultCityworksService(CityworksAppClient cwClient)
    {
        this.cwClient = cwClient;
    }

    public Task<CasePaymentModel> AddPayment(AddCasePaymentRequest addRequest, CancellationToken ct) =>
        cwClient.PLL.AddCasePayment(addRequest, ct);

    public Task<CwUserModel> GetAdminUser(CancellationToken ct) =>
        cwClient.CwUsers.GetAdminUser(ct);

    public Task<CwTenderTypeModel[]> GetTenderTypes(CancellationToken ct) =>
        cwClient.PLL.GetTenderTypes(ct);
}
