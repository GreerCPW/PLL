using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using XTI_Core;
using XTI_Core.Extensions;
using XTI_DB;

namespace CPW_PllDB.SqlServer;

public static class Extensions
{
    public static void AddPllDbContextForSqlServer(this IServiceCollection services)
    {
        services.AddConfigurationOptions<DbOptions>(DbOptions.DB);
        services.AddDbContext<PllDbContext>((sp, options) =>
        {
            var dbOptions = sp.GetRequiredService<DbOptions>();
            var xtiEnv = sp.GetRequiredService<XtiEnvironment>();
            var connectionString = new XtiConnectionString(dbOptions, new XtiDbName(xtiEnv.EnvironmentName, "PLL")).Value();
            options.UseSqlServer
            (
                connectionString,
                b => b.MigrationsAssembly("CPW_PllDB.SqlServer")
            );
            if (xtiEnv.IsDevelopmentOrTest())
            {
                options.EnableSensitiveDataLogging();
            }
            else
            {
                options.EnableSensitiveDataLogging(false);
            }
        });
    }
}