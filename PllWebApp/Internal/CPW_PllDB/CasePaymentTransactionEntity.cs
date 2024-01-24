namespace CPW_PllDB;

public sealed class CasePaymentTransactionEntity
{
    public int ID { get; set; }
    public int CaseID { get; set; }
    public string TransactionKey { get; set; } = "";
    public decimal AmountReceived { get; set; }
    public DateTimeOffset TimeStarted { get; set; }
    public DateTimeOffset TimeProcessed { get; set; }
    public string GatewayID { get; set; } = "";
}
