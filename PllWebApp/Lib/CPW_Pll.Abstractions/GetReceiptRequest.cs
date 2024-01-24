namespace CPW_Pll.Abstractions;

public sealed class GetReceiptRequest
{
    public GetReceiptRequest()
        : this("")
    {
    }

    public GetReceiptRequest(string transactionKey)
    {
        TransactionKey = transactionKey;
    }

    public string TransactionKey { get; set; }
}
