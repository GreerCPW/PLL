namespace XTI_PllWebAppApi;

public static class PllAppApiExtensions
{
    public static void AddPllAppApiServices(this IServiceCollection services)
    {
        services.AddCaseGroupServices();
        services.AddCustomerCaseGroupServices();
        services.AddHomeGroupServices();
        services.AddPaymentsGroupServices();
        services.AddWipCaseGroupServices();
        services.AddWipCasesGroupServices();
    }
}