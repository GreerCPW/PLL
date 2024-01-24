namespace CPW_Pll.Abstractions;

public sealed class StartCasePaymentFeeRequest
{
    public long FeeID { get; set; }
    public decimal Amount { get; set; }
}
