using XTI_PllWebAppApi.AfterPayment;

namespace XTI_PllWebAppApi;

internal static class AfterPaymentGroupExtensions
{
    public static void AddAfterPaymentGroupServices(this IServiceCollection services)
    {
        services.AddScoped<GetReceiptAction>();
        services.AddScoped<WaitForReceiptAction>();
    }
}