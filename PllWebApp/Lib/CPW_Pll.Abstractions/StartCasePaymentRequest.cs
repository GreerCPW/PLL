namespace CPW_Pll.Abstractions;

public sealed class StartCasePaymentRequest
{
    public long CityworksCaseID { get; set; }
    public StartCasePaymentFeeRequest[] Fees { get; set; } = new StartCasePaymentFeeRequest[0];
}
