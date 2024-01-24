using CPW_Cityworks.Abstractions;
using XTI_CityworksAppClient;
using XTI_PllWebAppApi;

namespace CPW_PllImplementations;

internal sealed class DefaultCityworksService : ICityworksService
{
    private readonly CityworksAppClient cwClient;

    public DefaultCityworksService(CityworksAppClient cwClient)
    {
        this.cwClient = cwClient;
    }

    public Task<BusinessCaseDetailModel> GetBusinessCaseDetail(long businessCaseID, CancellationToken ct) =>
        cwClient.PLL.GetBusinessCaseDetail(businessCaseID, ct);

    public Task<BusinessCaseModel[]> GetBusinessCases(CancellationToken ct) =>
        cwClient.PLL.GetBusinessCases(ct);

    public Task<CaseDetailModel> GetCaseDetail(long id, CancellationToken ct) =>
        cwClient.PLL.GetCaseDetail(id, ct);

    public Task<CwMapLayerModel[]> GetCaseMapLayers(long id, CancellationToken ct) =>
        cwClient.PLL.GetCaseMapLayers(id, ct);

    public Task<InspectionModel[]> GetInspections(GetInspectionsRequest getRequest, CancellationToken ct) =>
        cwClient.Inspections.GetInspections(getRequest, ct);

    public Task<CaseRoleModel[]> GetRoles(CancellationToken ct) =>
        cwClient.PLL.GetRoles(ct);

    public Task<ServiceRequestModel[]> GetServiceRequests(GetSrvReqsRequest getRequest, CancellationToken ct) =>
        cwClient.ServiceRequests.GetServiceRequests(getRequest, ct);

    public Task<WorkOrderModel[]> GetWorkOrders(GetWorkOrdersRequest getRequest, CancellationToken ct) =>
        cwClient.WorkOrders.GetWorkOrders(getRequest, ct);
}
