using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi.Case;

public sealed class CaseGroup : AppApiGroupWrapper
{
    public CaseGroup(AppApiGroup source, IServiceProvider sp)
        : base(source)
    {
        GetCaseDetail = source.AddAction(nameof(GetCaseDetail), () => sp.GetRequiredService<GetCaseDetailAction>());
        GetInspections = source.AddAction(nameof(GetInspections), () => sp.GetRequiredService<GetInspectionsAction>());
        GetMapLayers = source.AddAction(nameof(GetMapLayers), () => sp.GetRequiredService<GetMapLayersAction>());
        GetServiceRequests = source.AddAction(nameof(GetServiceRequests), () => sp.GetRequiredService<GetServiceRequestsAction>());
        GetWorkOrders = source.AddAction(nameof(GetWorkOrders), () => sp.GetRequiredService<GetWorkOrdersAction>());
        Index = source.AddAction(nameof(Index), () => sp.GetRequiredService<IndexAction>());
    }

    public AppApiAction<GetCaseRequest, CaseDetailModel> GetCaseDetail { get; }
    public AppApiAction<GetInspectionsRequest, InspectionModel[]> GetInspections { get; }
    public AppApiAction<long, CwMapLayerModel[]> GetMapLayers { get; }
    public AppApiAction<GetSrvReqsRequest, ServiceRequestModel[]> GetServiceRequests { get; }
    public AppApiAction<GetWorkOrdersRequest, WorkOrderModel[]> GetWorkOrders { get; }
    public AppApiAction<GetCaseRequest, WebViewResult> Index { get; }
}