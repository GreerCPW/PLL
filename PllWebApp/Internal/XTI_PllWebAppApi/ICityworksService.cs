using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi;

public interface ICityworksService
{
    public Task<BusinessCaseModel[]> GetBusinessCases(CancellationToken ct);

    public Task<BusinessCaseDetailModel> GetBusinessCaseDetail(long businessCaseID, CancellationToken ct);

    public Task<CaseRoleModel[]> GetRoles(CancellationToken ct);

    public Task<CaseDetailModel> GetCaseDetail(long id, CancellationToken ct);  

    public Task<CwMapLayerModel[]> GetCaseMapLayers(long id, CancellationToken ct);

    public Task<WorkOrderModel[]> GetWorkOrders(GetWorkOrdersRequest getRequest, CancellationToken ct);

    public Task<ServiceRequestModel[]> GetServiceRequests(GetSrvReqsRequest getRequest, CancellationToken ct);

    public Task<InspectionModel[]> GetInspections(GetInspectionsRequest getRequest, CancellationToken ct);
}
