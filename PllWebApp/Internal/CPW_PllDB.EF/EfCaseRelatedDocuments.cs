using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CPW_PllDB.EF;

public sealed class EfCaseRelatedDocuments
{
    private readonly PllDbContext db;

    public EfCaseRelatedDocuments(PllDbContext db)
    {
        this.db = db;
    }

    internal async Task<EfCaseRelatedDocument> AddRelatedDocument
    (
        int caseID, 
        long cityworksLabelID, 
        string tempDirectory, 
        IFormFile file
    )
    {
        var ext = Path.GetExtension(file.FileName);
        var tempFilePath = Path.Combine(tempDirectory, $"{caseID}_{Guid.NewGuid():D}{ext}");
        if (File.Exists(tempFilePath))
        {
            File.Delete(tempFilePath);
        }
        using (var tempFileStream = new FileStream(tempFilePath, FileMode.OpenOrCreate, FileAccess.Write))
        {
            file.CopyTo(tempFileStream);
        }
        var doc = new CaseRelatedDocumentEntity
        {
            CaseID = caseID,
            CityworksLabelID = cityworksLabelID,
            FileName = file.FileName,
            TempFilePath = tempFilePath
        };
        await db.CaseRelatedDocuments.Create(doc);
        return new EfCaseRelatedDocument(db, doc);
    }

    public async Task<EfCaseRelatedDocument> RelatedDocument(int relatedDocumentID)
    {
        var relatedDocument = await db.CaseRelatedDocuments.Retrieve()
            .Where(d => d.ID == relatedDocumentID)
            .FirstAsync();
        return new EfCaseRelatedDocument(db, relatedDocument);
    }

    internal async Task<EfCaseRelatedDocument[]> RelatedDocuments(int caseID)
    {
        var relatedDocuments = await db.CaseRelatedDocuments.Retrieve()
            .Where(d => d.CaseID == caseID)
            .ToArrayAsync();
        return relatedDocuments.Select(d => new EfCaseRelatedDocument(db, d)).ToArray();
    }

}
