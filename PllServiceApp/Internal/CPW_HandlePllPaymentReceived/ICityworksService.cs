using CPW_Cityworks.Abstractions;

namespace CPW_HandlePllPaymentReceived;

public interface ICityworksService
{
    Task<CwTenderTypeModel[]> GetTenderTypes(CancellationToken ct);

    Task<CwUserModel> GetAdminUser(CancellationToken ct);

    Task<CasePaymentModel> AddPayment(AddCasePaymentRequest addRequest, CancellationToken ct);
}
