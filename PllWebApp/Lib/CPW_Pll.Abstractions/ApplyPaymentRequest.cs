namespace CPW_Pll.Abstractions;

public sealed class ApplyPaymentRequest
{
    public int TransactionFeeID { get; set; }
    public long CityworksPaymentID { get; set; }
    public decimal AmountPaid { get; set; }
}
