using CPW_PllDB.SqlServer;
using CPW_PllImplementations;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using PllWebApp.ApiControllers;
using XTI_App.Api;
using XTI_CityworksAppClient;
using XTI_Core;
using XTI_GisAppClient;
using XTI_HubAppClient.WebApp.Extensions;
using XTI_PllWebAppApi;
using XTI_WebApp.Abstractions;

var builder = XtiWebAppHost.CreateDefault(PllInfo.AppKey, args);
var xtiEnv = XtiEnvironment.Parse(builder.Environment.EnvironmentName);
builder.Services.ConfigureXtiCookieAndTokenAuthentication(xtiEnv, builder.Configuration);
builder.Services.AddScoped<AppApiFactory, PllAppApiFactory>();
builder.Services.AddScoped(sp => (PllAppApi)sp.GetRequiredService<IAppApi>());
builder.Services.AddPllAppApiServices();
builder.Services.AddScoped<CityworksAppClientVersion>();
builder.Services.AddScoped<CityworksAppClient>();
builder.Services.AddScoped<GisAppClientVersion>();
builder.Services.AddScoped<GisAppClient>();
builder.Services.AddPllDbContextForSqlServer();
builder.Services.AddDefaultPllImplementations();
builder.Services.AddSingleton
(
    _ => new AppPageModel
    {
        PostStyleSheets = new[]
        {
            "https://js.arcgis.com/calcite-components/1.1.0/calcite.css",
            "https://js.arcgis.com/4.26/@arcgis/core/assets/esri/themes/light/main.css"
        }
    }
);
if (xtiEnv.IsDevelopment())
{
    builder.Services.AddCors
    (
        options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
                builder.AllowCredentials();
                builder.SetIsOriginAllowed(origin => new Uri(origin).Host.StartsWith("development.", StringComparison.OrdinalIgnoreCase));
            });
        }
    );
}
builder.Services
    .AddMvc()
    .AddJsonOptions(options =>
    {
        options.SetDefaultJsonOptions();
    })
    .AddMvcOptions(options =>
    {
        options.SetDefaultMvcOptions();
    });
builder.Services.AddControllersWithViews()
    .PartManager.ApplicationParts.Add
    (
        new AssemblyPart(typeof(HomeController).Assembly)
    );

var app = builder.Build();
if (xtiEnv.IsDevelopment())
{
    app.UseCors();
}
app.UseXtiDefaults();
await app.RunAsync();