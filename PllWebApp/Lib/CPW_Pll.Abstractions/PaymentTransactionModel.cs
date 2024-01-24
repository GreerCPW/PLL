namespace CPW_Pll.Abstractions;

public sealed record PaymentTransactionModel
(
    int ID,
    string TransactionKey,
    decimal AmountReceived,
    DateTimeOffset TimeStarted,
    DateTimeOffset TimeProcessed,
    string GatewayID
)
{
    public PaymentTransactionModel()
        : this(0, "", 0, DateTimeOffset.MaxValue, DateTimeOffset.MaxValue, "")
    {
    }

    public bool HasProcessed() => !string.IsNullOrWhiteSpace(GatewayID);
}