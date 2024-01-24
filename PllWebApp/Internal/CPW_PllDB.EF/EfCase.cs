using CPW_Cityworks.Abstractions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CPW_PllDB.EF;

public sealed class EfCase
{
    private readonly PllDbContext db;
    private readonly CaseEntity caseEntity;

    public EfCase(PllDbContext db, CaseEntity caseEntity)
    {
        this.db = db;
        this.caseEntity = caseEntity;
    }

    public long CityworksBusinessCaseID { get => caseEntity.CityworksBusinessCaseID; }

    public void EnsureSameUserID(int userID)
    {
        if (userID != caseEntity.UserID)
        {
            throw new Exception($"User {userID} does not have access to case {caseEntity.ID}.");
        }
    }

    public Task UpdateLocation(string location, decimal x, decimal y) =>
        db.Cases.Update
        (
            caseEntity, 
            c =>
            {
                c.Location = location;
                c.X = x;
                c.Y = y;
            }
        );

    public Task UpdateCityworksID(long cityworksID) =>
        db.Cases.Update(caseEntity, c => c.CityworksID = cityworksID);

    public async Task<WipCaseDetailModel> ToDetailModel(BusinessCaseDetailModel businessCaseDetail, CaseRoleModel[] roles)
    {
        var dataGroups = await DataGroups();
        var dataGroupModels = new List<CustomerCaseDataGroupModel>();
        foreach (var dataGroup in dataGroups)
        {
            var dataGroupModel = await dataGroup.ToModel(businessCaseDetail);
            dataGroupModels.Add(dataGroupModel);
        }
        var people = await new EfCasePeople(db).GetCasePersons(caseEntity);
        var personModels = new List<WipCasePersonModel>();
        foreach (var person in people)
        {
            var personModel = await person.ToModel(roles);
            personModels.Add(personModel);
        }
        var documentLabels = businessCaseDetail.GetDocumentLabels();
        var relatedDocuments = await new EfCaseRelatedDocuments(db).RelatedDocuments(caseEntity.ID);
        var serviceTypes = await db.CaseServiceTypes.Retrieve()
            .Where(st => st.CaseID == caseEntity.ID)
            .ToArrayAsync();
        var customerCase = new WipCaseDetailModel
        (
            Case: ToModel(),
            BusinessCase: businessCaseDetail.BusinessCase,
            DataGroups: dataGroupModels.ToArray(),
            People: personModels.ToArray(),
            DocumentLabels: documentLabels,
            RelatedDocuments: relatedDocuments.Select(d => d.ToModel(documentLabels)).ToArray(),
            ServiceTypes: serviceTypes.Select(st => st.ServiceType).ToArray()
        );
        return customerCase;
    }

    public WipCaseModel ToModel() =>
        new WipCaseModel
        (
            ID: caseEntity.ID,
            Description: caseEntity.Description,
            Location: caseEntity.Location,
            X: caseEntity.X,
            Y: caseEntity.Y,
            CityworksID: caseEntity.CityworksID,
            StatusCode: CaseStatusCode.Values.Value(caseEntity.CaseStatusCode),
            TimeCreated: caseEntity.TimeCreated,
            TimeCompleted: caseEntity.TimeCompleted
        );

    private async Task<EfCaseDataGroup[]> DataGroups()
    {
        var dataGroups = await db.CaseDataGroups.Retrieve()
            .Where(dg => dg.CaseID == caseEntity.ID)
            .ToArrayAsync();
        return dataGroups.Select(dg => new EfCaseDataGroup(db, dg)).ToArray();
    }

    public Task<EfCaseRelatedDocument> AddRelatedDocument(long cityworksLabelID, string tempDirectory, IFormFile file) =>
        new EfCaseRelatedDocuments(db).AddRelatedDocument(caseEntity.ID, cityworksLabelID, tempDirectory, file);

    public async Task UpdateServiceTypes(string[] serviceTypes)
    {
        var existing = await db.CaseServiceTypes.Retrieve()
            .Where(st => st.CaseID == caseEntity.ID)
            .ToArrayAsync();
        var serviceTypesToDelete = existing.Where(st => !serviceTypes.Contains(st.ServiceType));
        foreach (var serviceType in serviceTypesToDelete)
        {
            await db.CaseServiceTypes.Delete(serviceType);
        }
        var serviceTypesToAdd = serviceTypes.Where(st => !existing.Any(e => e.ServiceType == st)).ToArray();
        foreach (var serviceType in serviceTypesToAdd)
        {
            await db.CaseServiceTypes.Create
            (
                new CaseServiceTypeEntity
                {
                    CaseID = caseEntity.ID,
                    ServiceType = serviceType
                }
            );
        }
    }

    public Task Delete() => db.Cases.Update(caseEntity, c => c.TimeDeleted = DateTimeOffset.Now);
}
