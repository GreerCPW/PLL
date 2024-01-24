using XTI_PllWebAppApi.Case;

namespace XTI_PllWebAppApi;

internal static class CaseGroupExtensions
{
    public static void AddCaseGroupServices(this IServiceCollection services)
    {
        services.AddScoped<IndexAction>();
    }
}