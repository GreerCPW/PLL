using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PllSetupApp;
using XTI_App.Abstractions;
using XTI_App.Api;
using XTI_AppSetupApp.Extensions;
using XTI_Jobs;
using XTI_Jobs.Abstractions;
using XTI_PllServiceAppApi;
using XTI_PllSeviceAppApi;
using XTI_ScheduledJobsAppClient;

await XtiSetupAppHost.CreateDefault(PllInfo.AppKey, args)
    .ConfigureServices((hostContext, services) =>
    {
        services.AddSingleton(_ => AppVersionKey.Current);
        services.AddScoped<AppApiFactory, PllAppApiFactory>();
        services.AddScoped<IAppSetup, PllAppSetup>();
        services.AddScoped<ScheduledJobsAppClient>();
        services.AddScoped<ScheduledJobsAppClientVersion>();
        services.AddScoped<IJobDb, SjcJobDb>();
        services.AddScoped<JobRegistrationBuilder>();
        services.AddScoped<PllJobSetup>();
    })
    .RunConsoleAsync();