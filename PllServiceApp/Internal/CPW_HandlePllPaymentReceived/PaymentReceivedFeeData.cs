namespace CPW_HandlePllPaymentReceived;

public sealed class PaymentReceivedFeeData
{
    public int TransactionFeeID { get; set; }
    public decimal Amount { get; set; }
    public long CityworksCaseID { get; set; }
    public long CityworksFeeID { get; set; }
    public long CityworksPaymentID { get; set; }
    public long TenderTypeID { get; set; }
    public long ReceivedByUserID { get; set; }
}
