using CPW_HandlePllPaymentReceived;
using CPW_PaymentEvents;
using XTI_Core;
using XTI_Jobs;

namespace CPW_HandlePllPaymentReceived;

public sealed class TransformedPaymentReceivedData : ITransformedEventData
{
    public Task<string> TransformEventData(string sourceKey, string sourceData)
    {
        var paymentReceivedEventData = PaymentReceivedEventData.ParseEventSourceData(sourceData);
        var paymentReceivedData = new PaymentReceivedData
        {
            TransactionID = int.Parse(paymentReceivedEventData.CustomFields[0]),
            Amount = paymentReceivedEventData.PaymentAmount,
            GatewayID = paymentReceivedEventData.PayGoTransactionID,
            IsChecking = paymentReceivedEventData.IsCheckingOrSavings()
        };
        var serialized = XtiSerializer.Serialize(paymentReceivedData);
        return Task.FromResult(serialized);
    }
}
