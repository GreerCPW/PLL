using CPW_Cityworks.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace CPW_PllDB.EF;

public sealed class EfCaseDataGroupDetail
{
    private readonly PllDbContext db;
    private readonly CaseDataGroupDetailEntity detail;

    public EfCaseDataGroupDetail(PllDbContext db, CaseDataGroupDetailEntity detail)
    {
        this.db = db;
        this.detail = detail;
    }

    public Task UpdateValue(string value) => db.CaseDataGroupDetails.Update(detail, d => d.Value = value);

    public async Task<EfCase> GetCase()
    {
        var efDataGroup = await GetDataGroup();
        var customerCase = await efDataGroup.GetCase();
        return customerCase;
    }

    public async Task<EfCaseDataGroup> GetDataGroup()
    {
        var dataGroup = await db.CaseDataGroups.Retrieve()
            .Where(dg => dg.ID == detail.DataGroupID)
            .FirstAsync();
        return new EfCaseDataGroup(db, dataGroup);
    }

    public CustomerCaseDataGroupDetailModel ToModel(BusinessCaseDetailModel businessCaseDetail)
    {
        var detailDefinition = businessCaseDetail.DataGroups
            .SelectMany(d => d.Details)
            .First(d => d.ID == detail.CityworksDetailDefinitionID);
        return new CustomerCaseDataGroupDetailModel
        (
            ID: detail.ID,
            DetailDefinition: detailDefinition,
            CityworksID: detail.CityworksID,
            Value: detail.Value
        );
    }
}
