using Microsoft.Extensions.DependencyInjection;
using XTI_PllWebAppApi;

namespace CPW_PllImplementations;

public static class ImplementationExtensions
{
    public static void AddDefaultPllImplementations(this IServiceCollection services)
    {
        services.AddScoped<ICityworksService, DefaultCityworksService>();
        services.AddScoped<IGisService, DefaultGisService>();
    }
}
