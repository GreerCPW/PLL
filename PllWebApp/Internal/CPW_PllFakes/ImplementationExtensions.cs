using Microsoft.Extensions.DependencyInjection;
using XTI_PllWebAppApi;

namespace CPW_PllFakes;

public static class ImplementationExtensions
{
    public static void AddFakeCustomerImplementations(this IServiceCollection services)
    {
        services.AddScoped<FakeCityworksService>();
        services.AddScoped<ICityworksService>(sp => sp.GetRequiredService<FakeCityworksService>());
        services.AddScoped<FakeGisService>();
        services.AddScoped<IGisService>(sp => sp.GetRequiredService<FakeGisService>());
    }
}
