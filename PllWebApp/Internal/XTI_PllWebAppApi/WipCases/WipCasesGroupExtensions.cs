using XTI_PllWebAppApi.WipCases;

namespace XTI_PllWebAppApi;

internal static class WipCasesGroupExtensions
{
    public static void AddWipCasesGroupServices(this IServiceCollection services)
    {
        services.AddScoped<AddCaseAction>();
        services.AddScoped<GetBusinessCasesAction>();
        services.AddScoped<GetIncompleteCasesAction>();
        services.AddScoped<GetSubmittedCasesAction>();
    }
}