using CPW_Cityworks.Abstractions;
using XTI_PllWebAppApi;

namespace CPW_PllFakes;

public sealed class FakeCityworksService : ICityworksService
{
    private readonly List<CaseRoleModel> roles = new();
    private readonly List<BusinessCaseDetailModel> businessCaseDetails = new();
    private readonly List<CaseDetailModel> cases = new();
    private long caseID = 3344;

    public FakeCityworksService()
    {
        roles.Add(new CaseRoleModel(1, "PRIMARY", "Primary Contact", new[] { "name", "cell_phone", "email" }));
        roles.Add(new CaseRoleModel(2, "DEVELOPER", "Developer", new string[0]));
        roles.Add(new CaseRoleModel(3, "ENGINEER", "Engineer", new string[0]));
        roles.Add(new CaseRoleModel(4, "PROP OWNER", "Property Owner", new string[0]));
        roles.Add(new CaseRoleModel(5, "REALTOR", "Realtor", new string[0]));
        businessCaseDetails.Add
        (
            new BusinessCaseDetailModel
            (
                BusinessCase: new BusinessCaseModel(2, "COMIND_DEV", "Commercial Industrial Development Projec", "Terms and Conditions"),
                CaseType: new CaseTypeModel(2, "DEVPROCESS", "Development Project"),
                SubType: new SubTypeModel(1, "COMIND_DEV", "Commercial Industrial Development Projec"),
                DataGroups: new[]
                {
                    new CaseDataGroupDefinitionModel
                    (
                        ID: 2,
                        Code: "COMMINDDEV",
                        Description: "Commercial/Industrial Development",
                        IsRegistered: true,
                        Details: new []
                        {
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 5,
                                Code: "PAC COMMNT",
                                Description: "Have you reviewed PAC Comments",
                                IsRequiredAtIntake: true,
                                AnswerFormat: CaseDataAnswerFormat.Values.YesNo,
                                Values: new string[0]
                            ),
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 6,
                                Code: "NO UNITS",
                                Description: "Enter number of units for commercial development",
                                IsRequiredAtIntake: true,
                                AnswerFormat: CaseDataAnswerFormat.Values.Number,
                                Values: new string[0]
                            )
                        }
                    ),
                    new CaseDataGroupDefinitionModel
                    (
                        ID: 3,
                        Code: "COMMIND_EL",
                        Description: "Comm/Ind (complete for electric request)",
                        IsRegistered: true,
                        Details: new []
                        {
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 39,
                                Code: "LOAD SHEET",
                                Description: "I acknowledge I will attach a Load Sheet when submitting this application",
                                IsRequiredAtIntake: false,
                                AnswerFormat: CaseDataAnswerFormat.Values.CheckBox,
                                Values: new string[0]
                            )
                        }
                    ),
                    new CaseDataGroupDefinitionModel
                    (
                        ID: 4,
                        Code: "GAS DEV",
                        Description: "Gas (complete for gas request)",
                        IsRegistered: true,
                        Details: new []
                        {
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 8,
                                Code: "BTU TOTAL",
                                Description: "Total BTU",
                                IsRequiredAtIntake: false,
                                AnswerFormat: CaseDataAnswerFormat.Values.Decimal,
                                Values: new string[0]
                            ),
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 9,
                                Code: "GAS PRESS",
                                Description: "Delivery Pressure",
                                IsRequiredAtIntake: false,
                                AnswerFormat: CaseDataAnswerFormat.Values.ListOfValues,
                                Values: new [] { "7 inch", "2 lbs", "5 lbs", "Other" }
                            )
                        }
                    ),
                    new CaseDataGroupDefinitionModel
                    (
                        ID: 5,
                        Code: "GAS APP",
                        Description: "Gas Appliances(complete for gas request)",
                        IsRegistered: true,
                        Details: new []
                        {
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 10,
                                Code: "GAS PACK",
                                Description: "Gas Pack (count)",
                                IsRequiredAtIntake: false,
                                AnswerFormat: CaseDataAnswerFormat.Values.Number,
                                Values: new string[0]
                            )
                        }
                    ),
                    new CaseDataGroupDefinitionModel
                    (
                        ID: 6,
                        Code: "SEWER DEV",
                        Description: "Sewer (complete for sewer request)",
                        IsRegistered: true,
                        Details: new []
                        {
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 21,
                                Code: "WW PERMIT",
                                Description: "Wastewater Supply Construction Permit #",
                                IsRequiredAtIntake: false,
                                AnswerFormat: CaseDataAnswerFormat.Values.Text,
                                Values: new string[0]
                            ),
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 22,
                                Code: "WW ISSDATE",
                                Description: "Wastewater Permit Issue Date",
                                IsRequiredAtIntake: false,
                                AnswerFormat: CaseDataAnswerFormat.Values.Date,
                                Values: new string[0]
                            )
                        }
                    ),
                    new CaseDataGroupDefinitionModel
                    (
                        ID: 7,
                        Code: "WATER DEV",
                        Description: "Water Dev (complete for water request)",
                        IsRegistered: true,
                        Details: new []
                        {
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 23,
                                Code: "WTR PERMIT",
                                Description: "Water Supply Construction Permit #",
                                IsRequiredAtIntake: false,
                                AnswerFormat: CaseDataAnswerFormat.Values.Text,
                                Values: new string[0]
                            ),
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 24,
                                Code: "WTRISSDATE",
                                Description: "Water Permit Issue Date",
                                IsRequiredAtIntake: false,
                                AnswerFormat: CaseDataAnswerFormat.Values.Date,
                                Values: new string[0]
                            )
                        }
                    ),
                    new CaseDataGroupDefinitionModel
                    (
                        ID: 8,
                        Code: "ELEC COST",
                        Description: "Electric Costs (internal)",
                        IsRegistered: false,
                        Details: new []
                        {
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 25,
                                Code: "ELEC COST",
                                Description: "Electric Cost from WO",
                                IsRequiredAtIntake: false,
                                AnswerFormat: CaseDataAnswerFormat.Values.Decimal,
                                Values: new string[0]
                            ),
                            new CaseDataDetailDefinitionModel
                            (
                                ID: 26,
                                Code: "ELEC EXP",
                                Description: "Electric Expansion",
                                IsRequiredAtIntake: false,
                                AnswerFormat: CaseDataAnswerFormat.Values.Decimal,
                                Values: new string[0]
                            )
                        }
                    )
                },
                DocumentLabels: new[]
                {
                    new CwDocumentLabelModel(2, "CAD File"),
                    new CwDocumentLabelModel(3, "Gas Incentive Agreement"),
                    new CwDocumentLabelModel(4, "SCDHEC"),
                    new CwDocumentLabelModel(5, "PAC Comments"),
                    new CwDocumentLabelModel(6, "Electric Load Sheet")
                }
            )
        );
    }

    public Task<BusinessCaseDetailModel> GetBusinessCaseDetail(long businessCaseID, CancellationToken ct)
    {
        var businessCaseDetail = businessCaseDetails.First(bc => bc.BusinessCase.ID == businessCaseID);
        return Task.FromResult(businessCaseDetail);
    }

    public Task<BusinessCaseModel[]> GetBusinessCases(CancellationToken ct)
    {
        var businessCases = businessCaseDetails.Select(bc => bc.BusinessCase).ToArray();
        return Task.FromResult(businessCases);
    }

    public Task<CaseDetailModel> GetCaseDetail(long id, CancellationToken ct) =>
        Task.FromResult(new CaseDetailModel());

    public Task<CwMapLayerModel[]> GetCaseMapLayers(long id, CancellationToken ct) =>
        Task.FromResult(new CwMapLayerModel[0]);

    public Task<InspectionModel[]> GetInspections(GetInspectionsRequest getRequest, CancellationToken ct) =>
        Task.FromResult(new InspectionModel[0]);

    public Task<CaseRoleModel[]> GetRoles(CancellationToken ct)=>
        Task.FromResult(roles.ToArray());

    public Task<ServiceRequestModel[]> GetServiceRequests(GetSrvReqsRequest getRequest, CancellationToken ct) =>
        Task.FromResult(new ServiceRequestModel[0]);

    public Task<WorkOrderModel[]> GetWorkOrders(GetWorkOrdersRequest getRequest, CancellationToken ct) =>
        Task.FromResult(new WorkOrderModel[0]);
}