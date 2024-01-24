// Generated Code
namespace PllWebApp.ApiControllers;
[Authorize]
public sealed partial class WipCaseController : Controller
{
    private readonly PllAppApi api;
    public WipCaseController(PllAppApi api)
    {
        this.api = api;
    }

    [HttpPost]
    public Task<ResultContainer<WipCaseRelatedDocumentModel>> AddRelatedDocument(AddRelatedDocumentRequest model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<AddRelatedDocumentRequest, WipCaseRelatedDocumentModel>("AddRelatedDocument").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<EmptyActionResult>> DeleteCase([FromBody] int model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<int, EmptyActionResult>("DeleteCase").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<long>> CompleteCase([FromBody] int model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<int, long>("CompleteCase").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<EmptyActionResult>> DeleteRelatedDocument([FromBody] int model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<int, EmptyActionResult>("DeleteRelatedDocument").Execute(model, ct);
    }

    public async Task<IActionResult> DownloadRelatedDocument(int model, CancellationToken ct)
    {
        var result = await api.Group("WipCase").Action<int, WebFileResult>("DownloadRelatedDocument").Execute(model, ct);
        return File(result.Data!.FileStream, result.Data!.ContentType, result.Data!.DownloadName);
    }

    [HttpPost]
    public Task<ResultContainer<CustomerPersonModel>> EditPerson([FromBody] EditPersonRequest model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<EditPersonRequest, CustomerPersonModel>("EditPerson").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<EmptyActionResult>> EditRelatedDocument([FromBody] EditWipCaseRelatedDocumentRequest model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<EditWipCaseRelatedDocumentRequest, EmptyActionResult>("EditRelatedDocument").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<AddressCandidateModel[]>> GeocodeAddress([FromBody] string model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<string, AddressCandidateModel[]>("GeocodeAddress").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<WipCaseDetailModel>> GetCaseDetail([FromBody] int model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<int, WipCaseDetailModel>("GetCaseDetail").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<CustomerPersonModel[]>> GetPeople(CancellationToken ct)
    {
        return api.Group("WipCase").Action<EmptyRequest, CustomerPersonModel[]>("GetPeople").Execute(new EmptyRequest(), ct);
    }

    public async Task<IActionResult> Index(GetWipCaseRequest model, CancellationToken ct)
    {
        var result = await api.Group("WipCase").Action<GetWipCaseRequest, WebViewResult>("Index").Execute(model, ct);
        return View(result.Data!.ViewName);
    }

    [HttpPost]
    public Task<ResultContainer<CustomerPersonModel>> ResetCasePerson([FromBody] int model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<int, CustomerPersonModel>("ResetCasePerson").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<string>> ReverseGeocode([FromBody] LatLongCoordinates model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<LatLongCoordinates, string>("ReverseGeocode").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<CustomerPersonModel>> SaveCasePerson([FromBody] SaveWipCasePersonRequest model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<SaveWipCasePersonRequest, CustomerPersonModel>("SaveCasePerson").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<EmptyActionResult>> SaveDataGroup([FromBody] SaveDataGroupRequest model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<SaveDataGroupRequest, EmptyActionResult>("SaveDataGroup").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<EmptyActionResult>> SaveLocation([FromBody] SaveLocationRequest model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<SaveLocationRequest, EmptyActionResult>("SaveLocation").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<WipCaseModel>> SaveMapLocation([FromBody] SaveMapLocationRequest model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<SaveMapLocationRequest, WipCaseModel>("SaveMapLocation").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<CustomerPersonModel>> SaveNewPerson([FromBody] SaveNewPersonRequest model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<SaveNewPersonRequest, CustomerPersonModel>("SaveNewPerson").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<EmptyActionResult>> SaveServiceTypes([FromBody] SaveServiceTypesRequest model, CancellationToken ct)
    {
        return api.Group("WipCase").Action<SaveServiceTypesRequest, EmptyActionResult>("SaveServiceTypes").Execute(model, ct);
    }
}