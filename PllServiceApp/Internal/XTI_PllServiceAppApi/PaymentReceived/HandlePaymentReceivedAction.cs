using CPW_HandlePllPaymentReceived;
using CPW_PaymentEvents;
using XTI_Jobs;

namespace XTI_PllServiceAppApi.PaymentReceived;

internal sealed class HandlePaymentReceivedAction : AppAction<EmptyRequest, EmptyActionResult>
{
    private readonly EventMonitorBuilder eventMonitor;
    private readonly HandlePllPaymentReceivedActionFactory actionFactory;
    private readonly TransformedPaymentReceivedData transformedData;

    public HandlePaymentReceivedAction(EventMonitorBuilder eventMonitor, HandlePllPaymentReceivedActionFactory actionFactory, TransformedPaymentReceivedData transformedData)
    {
        this.eventMonitor = eventMonitor;
        this.actionFactory = actionFactory;
        this.transformedData = transformedData;
    }

    public async Task<EmptyActionResult> Execute(EmptyRequest model, CancellationToken ct)
    {
        await eventMonitor
            .When(PaymentEvents.PllPaymentReceived)
            .Trigger(HandlePllPaymentReceivedInfo.JobKey)
            .UseJobActionFactory(actionFactory)
            .TransformEventData(transformedData)
            .Build()
            .Run(ct);
        return new EmptyActionResult();
    }
}