namespace CPW_Pll.Abstractions;

public sealed record PaymentTransactionDetailModel(long CityworksCaseID, PaymentTransactionModel Transaction, PaymentTransactionFeeModel[] Fees)
{
    public PaymentTransactionDetailModel()
        :this(0,new PaymentTransactionModel(), new PaymentTransactionFeeModel[0])
    {
    }
}
