namespace CPW_HandlePllPaymentReceived;

public sealed class PaymentReceivedData
{
    public int TransactionID { get; set; }
    public decimal Amount { get; set; }
    public string GatewayID { get; set; } = "";
    public bool IsChecking { get; set; }
    public long TenderTypeID { get; set; }
    public long ReceivedByUserID { get; set; }
}
