using Microsoft.Extensions.DependencyInjection;

namespace XTI_PllAppClient;

public static class ClientExtensions
{
    public static void AddPllAppClient(this IServiceCollection services)
    {
        services.AddScoped<PllAppClientVersion>();
        services.AddScoped<PllAppClient>();
    }
}
