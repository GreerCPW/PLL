using CPW_Cityworks.Abstractions;
using XTI_WebApp.Api;

namespace CPW_PllDB.EF;

public sealed class EfCaseRelatedDocument
{
    private readonly PllDbContext db;
    private readonly CaseRelatedDocumentEntity doc;

    internal EfCaseRelatedDocument(PllDbContext db, CaseRelatedDocumentEntity doc)
    {
        this.db = db;
        this.doc = doc;
    }

    public Task<EfCase> GetCase() => new EfCases(db).GetCase(doc.CaseID);

    public Task Delete()
    {
        if (!string.IsNullOrWhiteSpace(doc.TempFilePath) && File.Exists(doc.TempFilePath))
        {
            File.Delete(doc.TempFilePath);
        }
        return db.CaseRelatedDocuments.Delete(doc);
    }

    public WipCaseRelatedDocumentModel ToModel(CwDocumentLabelModel[] documentLabels) =>
        new WipCaseRelatedDocumentModel
        (
            ID: doc.ID,
            FileName: doc.FileName,
            Thumbnail: GetThumbnail(),
            ContentType: GetContentType(),
            DocumentLabel: documentLabels.First(l => l.ID == doc.CityworksLabelID),
            CityworksID: doc.CityworksID
        );

    private static readonly string[] ImageExtensions = new[] { "jpg", "jpeg", "png", "bmp", "tiff" };

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Interoperability", "CA1416:Validate platform compatibility", Justification = "<Pending>")]
    private string GetThumbnail()
    {
        string thumbnail;
        var ext = GetExtensionText();
        if (ImageExtensions.Contains(ext))
        {
            try
            {
                using var img = System.Drawing.Image.FromFile(doc.TempFilePath);
                using var thumbnailImg = img.GetThumbnailImage(100, 100, () => false, IntPtr.Zero);
                using var thumbnailStream = new MemoryStream();
                thumbnailImg.Save(thumbnailStream, img.RawFormat);
                thumbnail = Convert.ToBase64String(thumbnailStream.ToArray());
            }
            catch
            {
                thumbnail = "";
            }
        }
        else
        {
            thumbnail = "";
        }
        return thumbnail;
    }

    private string GetExtensionText()
    {
        var ext = Path.GetExtension(doc.FileName)?.ToLower() ?? "";
        if (ext.StartsWith('.'))
        {
            ext = ext.Substring(1);
        }
        return ext;
    }

    public Task EditCityworksLabel(int cityworksLabelID) =>
        db.CaseRelatedDocuments.Update
        (
            doc,
            d => d.CityworksLabelID = cityworksLabelID
        );

    public Task<WebFileResult> Download()
    {
        var file = new WebFileResult
        (
            new FileStream(doc.TempFilePath, FileMode.Open, FileAccess.Read),
            GetContentType(),
            doc.FileName
        );
        return Task.FromResult(file);
    }

    private string GetContentType()
    {
        var ext = GetExtensionText();
        return 
            ext == "jpeg" || ext == "jpg" ? "image/jpg"
            : ext == "png" ? "image/png"
            : ext == "tiff" ? "image/tiff"
            : ext == "bmp" ? "image/bmp"
            : ext == "pdf" ? "application/pdf"
            : ext == "dwg" ? "image/x-dwg"
            : ext == "dxf" ? "image/x-dxf"
            : ext == "dwf" ? "drawing/x-dwf"
            : ext == "txt" ? "text/plain"
            : ext == "xls" ? "application/vnd.ms-excel"
            : ext == "xlsx" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            : ext == "doc" ? "application/msword"
            : ext == "docx" ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            : "";
    }
}
