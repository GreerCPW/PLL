namespace CPW_Pll.Abstractions;

public sealed record ReceiptModel
(
    int TransactionID, 
    long CityworksCaseID, 
    bool Succeeded, 
    string CaseNumber,
    ReceiptFeeModel[] Fees
)
{
    public ReceiptModel()
        : this(0, 0, false, "", new ReceiptFeeModel[0])
    {
    }
}