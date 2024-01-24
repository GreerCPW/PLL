using Microsoft.Extensions.Hosting;
using XTI_Core;
using XTI_HubAppClient.ServiceApp.Extensions;
using XTI_Schedule;
using XTI_PllServiceAppApi;
using Microsoft.Extensions.DependencyInjection;
using XTI_App.Api;
using CPW_HandlePllPaymentReceived;
using XTI_Jobs.Abstractions;
using XTI_Jobs;
using XTI_ScheduledJobsAppClient;
using XTI_PllAppClient;
using CPW_PllImplementations;
using XTI_CityworksAppClient;

await XtiServiceAppHost.CreateDefault(PllInfo.AppKey, args)
    .ConfigureServices((hostContext, services) =>
    {
        services.AddPllAppApiServices();
        services.AddScoped<AppApiFactory, PllAppApiFactory>();
        services.AddScoped(sp => (PllAppApi)sp.GetRequiredService<IAppApi>());
        services.AddPllAppClient();
        services.AddScoped<CityworksAppClientVersion>();
        services.AddScoped<CityworksAppClient>();
        services.AddScoped<ScheduledJobsAppClient>();
        services.AddScoped<ScheduledJobsAppClientVersion>();
        services.AddScoped<IJobDb, SjcJobDb>();
        services.AddScoped<EventMonitorBuilder>();
        services.AddScoped<HandlePllPaymentReceivedActionFactory>();
        services.AddScoped<TransformedPaymentReceivedData>();
        services.AddDefaultPllServices();
        services.AddAppAgenda
        (
            (sp, agenda) =>
            {
                agenda.AddScheduled<PllAppApi>
                (
                    (api, agendaItem) =>
                    {
                        agendaItem.Action(api.PaymentReceived.HandlePaymentReceived)
                            .Interval(TimeSpan.FromSeconds(15))
                            .AddSchedule
                            (
                                Schedule.EveryDay().At(TimeRange.AllDay())
                            );
                    }
                );
            }
        );
    })
    .UseWindowsService()
    .Build()
    .RunAsync();