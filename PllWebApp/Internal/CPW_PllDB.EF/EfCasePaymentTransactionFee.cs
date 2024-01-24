namespace CPW_PllDB.EF;

public sealed class EfCasePaymentTransactionFee
{
    private readonly PllDbContext db;
    private readonly CasePaymentTransactionFeeEntity fee;

    internal EfCasePaymentTransactionFee(PllDbContext db, CasePaymentTransactionFeeEntity fee)
    {
        this.db = db;
        this.fee = fee;
    }

    public Task ApplyPayment(long cityworksPaymentID, decimal amountPaid) =>
        db.CasePaymentTransactionFees.Update
        (
            fee,
            f =>
            {
                f.CityworksPaymentID = cityworksPaymentID;
                f.AmountPaid = amountPaid;
            }
        );

    public PaymentTransactionFeeModel ToModel() =>
        new PaymentTransactionFeeModel
        (
            ID: fee.ID,
            CityworksFeeID: fee.CityworksFeeID,
            FeeAmount: fee.FeeAmount,
            AmountPaid: fee.AmountPaid,
            CityworksPaymentID: fee.CityworksPaymentID
        );
}
