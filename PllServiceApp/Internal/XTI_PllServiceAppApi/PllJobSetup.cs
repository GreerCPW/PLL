using CPW_HandlePllPaymentReceived;
using XTI_Jobs;

namespace XTI_PllSeviceAppApi;

public sealed class PllJobSetup
{
    private readonly JobRegistrationBuilder jobRegistration;

    public PllJobSetup(JobRegistrationBuilder jobRegistration)
    {
        this.jobRegistration = jobRegistration;
    }

    public Task Run() =>
        jobRegistration
            .AddJob(HandlePllPaymentReceivedInfo.JobKey)
                .TimeoutAfter(TimeSpan.FromHours(1))
                .AddTasks(HandlePllPaymentReceivedInfo.AllTasks)
            .Build()
            .Register();
}
