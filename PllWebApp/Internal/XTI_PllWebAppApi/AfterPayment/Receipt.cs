namespace XTI_PllWebAppApi.AfterPayment;

internal sealed class Receipt
{
    private readonly PllDbContext db;
    private readonly ICityworksService cwService;
    private readonly string transactionKey;

    public Receipt(PllDbContext db, ICityworksService cwService, string transactionKey)
    {
        this.db = db;
        this.cwService = cwService;
        this.transactionKey = transactionKey;
    }

    public async Task<ReceiptModel> Value(TimeSpan waitForApproval, CancellationToken ct)
    {
        var endTime = waitForApproval.TotalMilliseconds == 0 ? DateTimeOffset.Now.AddMinutes(-1) : DateTimeOffset.Now.Add(waitForApproval);
        var efTransaction = await new EfCasePaymentTransactions(db).GetTransactionByKey(transactionKey);
        var transactionModel = efTransaction.ToModel();
        while (DateTimeOffset.Now < endTime && !transactionModel.HasProcessed())
        {
            await Task.Delay(TimeSpan.FromSeconds(10));
            efTransaction = await efTransaction.Refresh();
            transactionModel = efTransaction.ToModel();
        }
        var efFees = await efTransaction.GetFees();
        var feeModels = efFees.Select(f => f.ToModel()).ToArray();
        var efCase = await efTransaction.GetCase();
        var caseModel = efCase.ToModel();
        var cwCaseDetail = await cwService.GetCaseDetail(caseModel.CityworksID, ct);
        var receiptFees = new List<ReceiptFeeModel>();
        if (transactionModel.HasProcessed())
        {
            foreach (var feeModel in feeModels)
            {
                var cwFee = cwCaseDetail.Fees.FirstOrDefault(f => f.ID == feeModel.CityworksFeeID);
                receiptFees.Add
                (
                    new ReceiptFeeModel
                    (
                        TransactionFeeID: feeModel.ID,
                        FeeDescription: cwFee?.Description ?? "",
                        FeeAmount: cwFee?.Amount ?? feeModel.FeeAmount,
                        AmountPaid: feeModel.AmountPaid
                    )
                );
            }
        }
        return new ReceiptModel
        (
            TransactionID: transactionModel.ID,
            CityworksCaseID: caseModel.CityworksID,
            Succeeded: transactionModel.HasProcessed(),
            CaseNumber: cwCaseDetail.Case.CaseNumber,
            Fees: receiptFees.ToArray()
        );
    }
}
