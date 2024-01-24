using CPW_Cityworks.Abstractions;
using CPW_HandlePllPaymentReceived;

namespace PllServiceAppTests;

internal sealed class FakeCityworksService : ICityworksService
{
    private readonly List<CasePaymentModel> payments = new();
    private readonly CwTenderTypeModel[] tenderTypes = new[]
    {
        new CwTenderTypeModel(1, CwTenderCode.Values.Cash, "Cash"),
        new CwTenderTypeModel(2, CwTenderCode.Values.Check, "Check"),
        new CwTenderTypeModel(3, CwTenderCode.Values.CreditCard, "Credit Card")
    };

    private static int paymentID = 3344;

    public CasePaymentModel[] GetPayments() => payments.ToArray();

    public Task<CwTenderTypeModel[]> GetTenderTypes(CancellationToken ct)
    {
        return Task.FromResult(tenderTypes);
    }

    public Task<CwUserModel> GetAdminUser(CancellationToken ct)
    {
        var user = new CwUserModel(12, "admin", "Admin", "User", "admin.user@example.com", "8645551234");
        return Task.FromResult(user);
    }

    public Task<CasePaymentModel> AddPayment(AddCasePaymentRequest addRequest, CancellationToken ct)
    {
        var tenderType = tenderTypes.First(t => t.ID == addRequest.TenderTypeID);
        var payment = new CasePaymentModel
        (
            ID: paymentID,
            CaseFeeID: addRequest.CaseFeeID,
            PaymentDate: addRequest.TimePaid,
            PaymentAmount: addRequest.AmountPaid,
            TenderType: tenderType.Description,
            Comment: ""
        );
        payments.Add(payment);
        paymentID++;
        return Task.FromResult(payment);
    }

}
