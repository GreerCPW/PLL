using CPW_PllDB;
using CPW_PllDB.SqlServer;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using XTI_Core;
using XTI_Core.Extensions;

namespace CPW_PllDBTool;

public sealed class PllDbContextFactory : IDesignTimeDbContextFactory<PllDbContext>
{
    public PllDbContext CreateDbContext(string[] args)
    {
        var host = Host.CreateDefaultBuilder()
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                config.UseXtiConfiguration(hostingContext.HostingEnvironment, "", "", args);
            })
            .ConfigureServices((hostContext, services) =>
            {
                services.AddSingleton(_ => XtiEnvironment.Parse(hostContext.HostingEnvironment.EnvironmentName));
                services.AddPllDbContextForSqlServer();
            })
            .Build();
        var scope = host.Services.CreateScope();
        return scope.ServiceProvider.GetRequiredService<PllDbContext>();
    }
}
