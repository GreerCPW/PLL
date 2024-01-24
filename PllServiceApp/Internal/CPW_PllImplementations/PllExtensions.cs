using CPW_HandlePllPaymentReceived;
using Microsoft.Extensions.DependencyInjection;

namespace CPW_PllImplementations;

public static class PllExtensions
{
    public static void AddDefaultPllServices(this IServiceCollection services)
    {
        services.AddScoped<IPllService, DefaultPllService>();
        services.AddScoped<ICityworksService, DefaultCityworksService>();
    }
}
