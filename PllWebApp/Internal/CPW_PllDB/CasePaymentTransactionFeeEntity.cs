namespace CPW_PllDB;

public sealed class CasePaymentTransactionFeeEntity
{
    public int ID { get; set; }
    public int TransactionID { get; set; }
    public long CityworksFeeID { get; set; }
    public decimal FeeAmount { get; set; }
    public decimal AmountPaid { get; set; }
    public long CityworksPaymentID { get; set; }
}
