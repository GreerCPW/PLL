using XTI_PllWebAppApi.Payments;

namespace XTI_PllWebAppApi;

internal static class PaymentsGroupExtensions
{
    public static void AddPaymentsGroupServices(this IServiceCollection services)
    {
        services.AddScoped<ApplyPaymentAction>();
        services.AddScoped<PaymentReceivedAction>();
    }
}