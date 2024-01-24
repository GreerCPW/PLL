using CPW_Pll.Abstractions;
using CPW_HandlePllPaymentReceived;

namespace PllServiceAppTests;

internal sealed class FakePllService : IPllService
{
    private readonly List<PaymentTransactionDetailModel> transactions = new();

    private static int caseID = 2233;
    private static int transactionID = 123;
    private static int feeID = 234;
    private static long cityworksFeeID = 987;

    public PaymentTransactionDetailModel AddTransaction(params decimal[] feeAmounts)
    {
        var transaction = new PaymentTransactionModel
        (
            transactionID, 
            Guid.NewGuid().ToString("D"), 
            0, 
            DateTimeOffset.Now, 
            DateTimeOffset.MaxValue, 
            ""
        );
        var fees = new List<PaymentTransactionFeeModel>();
        foreach (var feeAmount in feeAmounts)
        {
            fees.Add
            (
                new PaymentTransactionFeeModel(feeID, cityworksFeeID, feeAmount, 0, 0)
            );
            feeID++;
            cityworksFeeID++;
        }
        var transactionDetail = new PaymentTransactionDetailModel
        (
            CityworksCaseID: caseID,
            Transaction: transaction,
            Fees: fees.ToArray()
        );
        transactions.Add(transactionDetail);
        caseID++;
        transactionID++;
        return transactionDetail;
    }

    public PaymentTransactionDetailModel GetTransaction(PaymentTransactionDetailModel transactionDetail) =>
        transactions.First(t => t.Transaction.ID == transactionDetail.Transaction.ID);

    public Task ApplyPayment(ApplyPaymentRequest applyRequest, CancellationToken ct)
    {
        var transaction = transactions.First(t => t.Fees.Any(f => f.ID == applyRequest.TransactionFeeID));
        transactions.Remove(transaction);
        var fee = transaction.Fees.First(f => f.ID == applyRequest.TransactionFeeID);
        var otherFees = transaction.Fees.Where(f => f != fee).ToArray();
        fee = fee with
        {
            AmountPaid = applyRequest.AmountPaid,
            CityworksPaymentID = applyRequest.CityworksPaymentID
        };
        transaction = transaction with
        {
            Fees = otherFees.Union(new[] { fee }).ToArray()
        };
        transactions.Add(transaction);
        return Task.CompletedTask;
    }

    public Task<PaymentTransactionDetailModel> PaymentReceived(PaymentReceivedRequest request, CancellationToken ct)
    {
        var transaction = transactions.First(t => t.Transaction.ID == request.TransactionID);
        transactions.Remove(transaction);
        transaction = transaction with
        {
            Transaction = transaction.Transaction with
            {
                AmountReceived = request.AmountReceived,
                GatewayID = request.GatewayID,
                TimeProcessed = DateTimeOffset.Now
            }
        };
        transactions.Add(transaction);
        return Task.FromResult(transaction);
    }
}
