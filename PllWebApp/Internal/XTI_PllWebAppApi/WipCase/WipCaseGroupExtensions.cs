using XTI_PllWebAppApi.WipCase;

namespace XTI_PllWebAppApi;

internal static class WipCaseGroupExtensions
{
    public static void AddWipCaseGroupServices(this IServiceCollection services)
    {
        services.AddScoped<AddRelatedDocumentAction>();
        services.AddScoped<DeleteCaseAction>();
        services.AddScoped<CompleteCustomerCaseAction>();
        services.AddScoped<DeleteRelatedDocumentAction>();
        services.AddScoped<DownloadRelatedDocumentAction>();
        services.AddScoped<EditPersonAction>();
        services.AddScoped<EditRelatedDocumentAction>();
        services.AddScoped<GeocodeAddressAction>();
        services.AddScoped<GetCaseDetailAction>();
        services.AddScoped<GetPeopleAction>();
        services.AddScoped<IndexAction>();
        services.AddScoped<ResetCasePersonAction>();
        services.AddScoped<ReverseGeocodeAction>();
        services.AddScoped<SaveCasePersonAction>();
        services.AddScoped<SaveDataGroupAction>();
        services.AddScoped<SaveLocationAction>();
        services.AddScoped<SaveMapLocationAction>();
        services.AddScoped<SaveNewPersonAction>();
        services.AddScoped<SaveServiceTypesAction>();
    }
}