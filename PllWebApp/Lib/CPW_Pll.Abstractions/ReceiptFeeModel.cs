namespace CPW_Pll.Abstractions;

public sealed record ReceiptFeeModel(int TransactionFeeID, string FeeDescription, decimal FeeAmount, decimal AmountPaid)
{
    public ReceiptFeeModel()
        : this(0, "", 0, 0)
    {
    }
}
