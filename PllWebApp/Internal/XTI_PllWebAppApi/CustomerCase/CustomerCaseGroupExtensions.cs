using XTI_PllWebAppApi.CustomerCase;

namespace XTI_PllWebAppApi;

internal static class CustomerCaseGroupExtensions
{
    public static void AddCustomerCaseGroupServices(this IServiceCollection services)
    {
        services.AddScoped<GetCaseDetailAction>();
        services.AddScoped<StartCasePaymentAction>();
        services.AddScoped<UploadMapImageAction>();
    }
}