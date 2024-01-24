using CPW_Cityworks.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace CPW_PllDB.EF;

public sealed class EfCases
{
    private readonly PllDbContext db;

    public EfCases(PllDbContext db)
    {
        this.db = db;
    }

    public async Task<EfCase> AddCase
    (
        BusinessCaseDetailModel businessCaseDetail,
        CaseRoleModel[] roles,
        int userID
    )
    {
        var caseEntity = new CaseEntity
        {
            CityworksBusinessCaseID = businessCaseDetail.BusinessCase.ID,
            UserID = userID,
            Description = businessCaseDetail.BusinessCase.Description,
            TimeCreated = DateTimeOffset.Now
        };
        await db.Cases.Create(caseEntity);
        foreach (var dataGroup in businessCaseDetail.DataGroups)
        {
            var serviceType =
                dataGroup.Code == "COMMIND_EL" || dataGroup.Code == "RES ELEC" ? "E"
                : dataGroup.Code == "GAS DEV" || dataGroup.Code == "GAS APP" ? "G"
                : dataGroup.Code == "SEWER DEV" || dataGroup.Code == "GAS APP" ? "S"
                : dataGroup.Code == "WATER DEV" || dataGroup.Code == "GAS APP" ? "W"
                : "";
            var dataGroupEntity = new CaseDataGroupEntity
            {
                CaseID = caseEntity.ID,
                CityworksDataGroupDefinitionID = dataGroup.ID,
                ServiceType = serviceType
            };
            await db.CaseDataGroups.Create(dataGroupEntity);
            foreach (var detail in dataGroup.Details)
            {
                var detailEntity = new CaseDataGroupDetailEntity
                {
                    DataGroupID = dataGroupEntity.ID,
                    CityworksDetailDefinitionID = detail.ID
                };
                await db.CaseDataGroupDetails.Create(detailEntity);
            }
        }
        var efPerson = await new EfPeople(db).AddOrUpdateNobody();
        var customerPerson = efPerson.ToModel();
        foreach (var role in roles)
        {
            var casePersonEntity = new CasePersonEntity
            {
                CaseID = caseEntity.ID,
                CityworksRoleID = role.ID,
                PersonID = customerPerson.ID
            };
            await db.CasePersons.Create(casePersonEntity);
        }
        return new EfCase(db, caseEntity);
    }

    public async Task<EfCase> GetCase(int caseID)
    {
        var caseEntity = await db.Cases.Retrieve().Where(c => c.ID == caseID).FirstAsync();
        return new EfCase(db, caseEntity);
    }

    public async Task<EfCase> GetCaseByCityworksID(long cityworksID)
    {
        var caseEntity = await db.Cases.Retrieve().Where(c => c.CityworksID == cityworksID).FirstAsync();
        return new EfCase(db, caseEntity);
    }

    public async Task<EfCase[]> GetSubmittedCases(int userID)
    {
        var cases = await db.Cases.Retrieve()
            .Where(c => c.UserID == userID && c.CityworksID > 0 && c.CaseStatusCode > 0)
            .OrderByDescending(c => c.TimeCreated)
            .ToArrayAsync();
        return cases.Select(c => new EfCase(db, c)).ToArray();
    }

    public async Task<EfCase[]> GetIncompleteCases(int userID)
    {
        var cases = await db.Cases.Retrieve()
            .Where(c => c.UserID == userID && (c.CityworksID == 0 || c.CaseStatusCode == 0))
            .OrderByDescending(c => c.TimeCreated)
            .ToArrayAsync();
        return cases.Select(c => new EfCase(db, c)).ToArray();
    }
}
