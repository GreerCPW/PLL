using Microsoft.Extensions.Caching.Memory;
using XTI_Jobs;
using XTI_Jobs.Abstractions;

namespace CPW_HandlePllPaymentReceived;

public sealed class HandlePllPaymentReceivedActionFactory : IJobActionFactory
{
    private readonly IMemoryCache cache;
    private readonly IPllService customerService;
    private readonly ICityworksService cwService;

    public HandlePllPaymentReceivedActionFactory(IMemoryCache cache, IPllService customerService, ICityworksService cwService)
    {
        this.cache = cache;
        this.customerService = customerService;
        this.cwService = cwService;
    }

    public IJobAction CreateJobAction(TriggeredJobTask jobTask)
    {
        IJobAction action;
        if (jobTask.TaskKey.Equals(HandlePllPaymentReceivedInfo.GetInitialData))
        {
            action = new GetInitialDataAction(cache, cwService, jobTask);
        }
        else if (jobTask.TaskKey.Equals(HandlePllPaymentReceivedInfo.PaymentReceived))
        {
            action = new PaymentReceivedAction(customerService, jobTask);
        }
        else if (jobTask.TaskKey.Equals(HandlePllPaymentReceivedInfo.AddCasePayment))
        {
            action = new AddCasePaymentAction(cwService, jobTask);
        }
        else if (jobTask.TaskKey.Equals(HandlePllPaymentReceivedInfo.ApplyPayment))
        {
            action = new ApplyPaymentAction(customerService, jobTask);
        }
        else
        {
            throw new NotSupportedException($"Task '{jobTask.TaskKey.DisplayText}' is not supported.");
        }
        return action;
    }

    public NextTaskModel[] FirstTasks(string taskData) => new[] 
    { 
        new NextTaskModel(HandlePllPaymentReceivedInfo.GetInitialData, taskData) 
    }; 
}
