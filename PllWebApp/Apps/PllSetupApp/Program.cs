using CPW_PllDB;
using CPW_PllDB.SqlServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PllSetupApp;
using XTI_App.Abstractions;
using XTI_App.Api;
using XTI_AppSetupApp.Extensions;
using XTI_DB;
using XTI_PllWebAppApi;

await XtiSetupAppHost.CreateDefault(PllInfo.AppKey, args)
    .ConfigureServices((hostContext, services) =>
    {
        services.AddSingleton(_ => AppVersionKey.Current);
        services.AddScoped<AppApiFactory, PllAppApiFactory>();
        services.AddScoped<IAppSetup, PllAppSetup>();
        services.AddPllDbContextForSqlServer();
        services.AddScoped<DbAdmin<PllDbContext>>();
    })
    .RunConsoleAsync();