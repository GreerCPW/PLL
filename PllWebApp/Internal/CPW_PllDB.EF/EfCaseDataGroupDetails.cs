using Microsoft.EntityFrameworkCore;

namespace CPW_PllDB.EF;

public sealed class EfCaseDataGroupDetails
{
    private readonly PllDbContext db;

    public EfCaseDataGroupDetails(PllDbContext db)
    {
        this.db = db;
    }

    public async Task<EfCaseDataGroupDetail[]> GetDetails(CaseDataGroupEntity dataGroup)
    {
        var details = await db.CaseDataGroupDetails.Retrieve()
            .Where(d => d.DataGroupID == dataGroup.ID)
            .ToArrayAsync();
        return details.Select(d => new EfCaseDataGroupDetail(db, d)).ToArray();
    }

    public async Task<EfCaseDataGroupDetail> GetDetail(int detailID)
    {
        var detail = await db.CaseDataGroupDetails.Retrieve()
            .Where(d => d.ID == detailID)
            .FirstAsync();
        return new EfCaseDataGroupDetail(db, detail);
    }
}
