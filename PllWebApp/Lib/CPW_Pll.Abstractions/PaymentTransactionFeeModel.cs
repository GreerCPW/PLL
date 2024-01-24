namespace CPW_Pll.Abstractions;

public sealed record PaymentTransactionFeeModel(int ID, long CityworksFeeID, decimal FeeAmount, decimal AmountPaid, long CityworksPaymentID)
{
    public PaymentTransactionFeeModel()
        : this(0, 0, 0, 0, 0)
    {
    }
}
