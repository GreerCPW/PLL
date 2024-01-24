namespace XTI_PllServiceAppApi;

public static class PllAppApiExtensions
{
    public static void AddPllAppApiServices(this IServiceCollection services)
    {
        services.AddPaymentReceivedGroupServices();
    }
}