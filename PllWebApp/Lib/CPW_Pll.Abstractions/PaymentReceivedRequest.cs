namespace CPW_Pll.Abstractions;

public sealed class PaymentReceivedRequest
{
    public int TransactionID { get; set; }
    public decimal AmountReceived { get; set; }
    public string GatewayID { get; set; } = "";
}
