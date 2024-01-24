using CPW_Gis.Abstractions;

namespace XTI_PllWebAppApi.WipCase;

public sealed class WipCaseGroup : AppApiGroupWrapper
{
    public WipCaseGroup(AppApiGroup source, IServiceProvider sp)
        : base(source)
    {
        AddRelatedDocument = source.AddAction(nameof(AddRelatedDocument), () => sp.GetRequiredService<AddRelatedDocumentAction>());
        DeleteCase = source.AddAction(nameof(DeleteCase), () => sp.GetRequiredService<DeleteCaseAction>());
        CompleteCase = source.AddAction(nameof(CompleteCase), () => sp.GetRequiredService<CompleteCustomerCaseAction>());
        DeleteRelatedDocument = source.AddAction
        (
            nameof(DeleteRelatedDocument), 
            () => sp.GetRequiredService<DeleteRelatedDocumentAction>()
        );
        DownloadRelatedDocument = source.AddAction
        (
            nameof(DownloadRelatedDocument),
            () => sp.GetRequiredService<DownloadRelatedDocumentAction>()
        );
        EditPerson = source.AddAction(nameof(EditPerson), () => sp.GetRequiredService<EditPersonAction>());
        EditRelatedDocument = source.AddAction(nameof(EditRelatedDocument), () => sp.GetRequiredService<EditRelatedDocumentAction>());
        GeocodeAddress = source.AddAction(nameof(GeocodeAddress), () => sp.GetRequiredService<GeocodeAddressAction>());
        GetCaseDetail = source.AddAction(nameof(GetCaseDetail), () => sp.GetRequiredService<GetCaseDetailAction>());
        GetPeople = source.AddAction(nameof(GetPeople), () => sp.GetRequiredService<GetPeopleAction>());
        Index = source.AddAction(nameof(Index), () => sp.GetRequiredService<IndexAction>());
        ResetCasePerson = source.AddAction(nameof(ResetCasePerson), () => sp.GetRequiredService<ResetCasePersonAction>());
        ReverseGeocode = source.AddAction(nameof(ReverseGeocode), () => sp.GetRequiredService<ReverseGeocodeAction>());
        SaveCasePerson = source.AddAction(nameof(SaveCasePerson), () => sp.GetRequiredService<SaveCasePersonAction>());
        SaveDataGroup = source.AddAction(nameof(SaveDataGroup), () => sp.GetRequiredService<SaveDataGroupAction>());
        SaveLocation = source.AddAction(nameof(SaveLocation), () => sp.GetRequiredService<SaveLocationAction>());
        SaveMapLocation = source.AddAction(nameof(SaveMapLocation), () => sp.GetRequiredService<SaveMapLocationAction>());
        SaveNewPerson = source.AddAction(nameof(SaveNewPerson), () => sp.GetRequiredService<SaveNewPersonAction>());
        SaveServiceTypes = source.AddAction(nameof(SaveServiceTypes), () => sp.GetRequiredService<SaveServiceTypesAction>());
    }

    public AppApiAction<AddRelatedDocumentRequest, WipCaseRelatedDocumentModel> AddRelatedDocument { get; }
    public AppApiAction<int, EmptyActionResult> DeleteCase { get; }
    public AppApiAction<int, long> CompleteCase { get; }
    public AppApiAction<int, EmptyActionResult> DeleteRelatedDocument { get; }
    public AppApiAction<int, WebFileResult> DownloadRelatedDocument { get; }
    public AppApiAction<EditPersonRequest, CustomerPersonModel> EditPerson { get; }
    public AppApiAction<EditWipCaseRelatedDocumentRequest, EmptyActionResult> EditRelatedDocument { get; }
    public AppApiAction<string, AddressCandidateModel[]> GeocodeAddress { get; }
    public AppApiAction<EmptyRequest, CustomerPersonModel[]> GetPeople { get; }
    public AppApiAction<int, WipCaseDetailModel> GetCaseDetail { get; }
    public AppApiAction<GetWipCaseRequest, WebViewResult> Index { get; }
    public AppApiAction<int, CustomerPersonModel> ResetCasePerson { get; }
    public AppApiAction<LatLongCoordinates, string> ReverseGeocode { get; }
    public AppApiAction<SaveWipCasePersonRequest, CustomerPersonModel> SaveCasePerson { get; }
    public AppApiAction<SaveDataGroupRequest, EmptyActionResult> SaveDataGroup { get; }
    public AppApiAction<SaveLocationRequest, EmptyActionResult> SaveLocation { get; }
    public AppApiAction<SaveMapLocationRequest, WipCaseModel> SaveMapLocation { get; }
    public AppApiAction<SaveNewPersonRequest, CustomerPersonModel> SaveNewPerson { get; }
    public AppApiAction<SaveServiceTypesRequest, EmptyActionResult> SaveServiceTypes { get; }
}