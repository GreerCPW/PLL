// Generated Code
namespace XTI_PllAppClient;
public sealed partial class CaseGroup : AppClientGroup
{
    public CaseGroup(IHttpClientFactory httpClientFactory, XtiTokenAccessor xtiTokenAccessor, AppClientUrl clientUrl, AppClientOptions options) : base(httpClientFactory, xtiTokenAccessor, clientUrl, options, "Case")
    {
        Actions = new CaseGroupActions(GetCaseDetail: CreatePostAction<GetCaseRequest, CaseDetailModel>("GetCaseDetail"), GetInspections: CreatePostAction<GetInspectionsRequest, InspectionModel[]>("GetInspections"), GetMapLayers: CreatePostAction<long, CwMapLayerModel[]>("GetMapLayers"), GetServiceRequests: CreatePostAction<GetSrvReqsRequest, ServiceRequestModel[]>("GetServiceRequests"), GetWorkOrders: CreatePostAction<GetWorkOrdersRequest, WorkOrderModel[]>("GetWorkOrders"), Index: CreateGetAction<GetCaseRequest>("Index"));
    }

    public CaseGroupActions Actions { get; }

    public Task<CaseDetailModel> GetCaseDetail(GetCaseRequest model, CancellationToken ct = default) => Actions.GetCaseDetail.Post("", model, ct);
    public Task<InspectionModel[]> GetInspections(GetInspectionsRequest model, CancellationToken ct = default) => Actions.GetInspections.Post("", model, ct);
    public Task<CwMapLayerModel[]> GetMapLayers(long model, CancellationToken ct = default) => Actions.GetMapLayers.Post("", model, ct);
    public Task<ServiceRequestModel[]> GetServiceRequests(GetSrvReqsRequest model, CancellationToken ct = default) => Actions.GetServiceRequests.Post("", model, ct);
    public Task<WorkOrderModel[]> GetWorkOrders(GetWorkOrdersRequest model, CancellationToken ct = default) => Actions.GetWorkOrders.Post("", model, ct);
    public sealed record CaseGroupActions(AppClientPostAction<GetCaseRequest, CaseDetailModel> GetCaseDetail, AppClientPostAction<GetInspectionsRequest, InspectionModel[]> GetInspections, AppClientPostAction<long, CwMapLayerModel[]> GetMapLayers, AppClientPostAction<GetSrvReqsRequest, ServiceRequestModel[]> GetServiceRequests, AppClientPostAction<GetWorkOrdersRequest, WorkOrderModel[]> GetWorkOrders, AppClientGetAction<GetCaseRequest> Index);
}