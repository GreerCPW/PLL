// Generated Code
namespace PllWebApp.ApiControllers;
[Authorize]
public sealed partial class CaseController : Controller
{
    private readonly PllAppApi api;
    public CaseController(PllAppApi api)
    {
        this.api = api;
    }

    [HttpPost]
    public Task<ResultContainer<CaseDetailModel>> GetCaseDetail([FromBody] GetCaseRequest model, CancellationToken ct)
    {
        return api.Group("Case").Action<GetCaseRequest, CaseDetailModel>("GetCaseDetail").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<InspectionModel[]>> GetInspections([FromBody] GetInspectionsRequest model, CancellationToken ct)
    {
        return api.Group("Case").Action<GetInspectionsRequest, InspectionModel[]>("GetInspections").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<CwMapLayerModel[]>> GetMapLayers([FromBody] long model, CancellationToken ct)
    {
        return api.Group("Case").Action<long, CwMapLayerModel[]>("GetMapLayers").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<ServiceRequestModel[]>> GetServiceRequests([FromBody] GetSrvReqsRequest model, CancellationToken ct)
    {
        return api.Group("Case").Action<GetSrvReqsRequest, ServiceRequestModel[]>("GetServiceRequests").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<WorkOrderModel[]>> GetWorkOrders([FromBody] GetWorkOrdersRequest model, CancellationToken ct)
    {
        return api.Group("Case").Action<GetWorkOrdersRequest, WorkOrderModel[]>("GetWorkOrders").Execute(model, ct);
    }

    public async Task<IActionResult> Index(GetCaseRequest model, CancellationToken ct)
    {
        var result = await api.Group("Case").Action<GetCaseRequest, WebViewResult>("Index").Execute(model, ct);
        return View(result.Data!.ViewName);
    }
}