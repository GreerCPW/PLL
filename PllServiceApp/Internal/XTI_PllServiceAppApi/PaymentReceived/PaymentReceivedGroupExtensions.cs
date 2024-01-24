using XTI_PllServiceAppApi.PaymentReceived;

namespace XTI_PllServiceAppApi;

internal static class PaymentReceivedGroupExtensions
{
    public static void AddPaymentReceivedGroupServices(this IServiceCollection services)
    {
        services.AddScoped<HandlePaymentReceivedAction>();
    }
}