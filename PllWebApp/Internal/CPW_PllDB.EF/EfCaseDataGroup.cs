using CPW_Cityworks.Abstractions;

namespace CPW_PllDB.EF;

public sealed class EfCaseDataGroup
{
    private readonly PllDbContext db;
    private readonly CaseDataGroupEntity dataGroup;

    internal EfCaseDataGroup(PllDbContext db, CaseDataGroupEntity dataGroup)
    {
        this.db = db;
        this.dataGroup = dataGroup;
    }

    public Task<EfCase> GetCase() => new EfCases(db).GetCase(dataGroup.CaseID);

    public async Task<CustomerCaseDataGroupModel> ToModel(BusinessCaseDetailModel businessCaseDetail)
    {
        var dataGroupDefinition = businessCaseDetail.DataGroups.First(dg => dg.ID == dataGroup.CityworksDataGroupDefinitionID);
        var details = await new EfCaseDataGroupDetails(db).GetDetails(dataGroup);
        return new CustomerCaseDataGroupModel
        (
            ID: dataGroup.ID,
            DataGroupDefinition: dataGroupDefinition,
            CityworksID: dataGroup.CityworksID,
            ServiceType: dataGroup.ServiceType,
            Details: details.Select(d => d.ToModel(businessCaseDetail)).ToArray()
        );
    }
}
