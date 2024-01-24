using System.Text.RegularExpressions;
using XTI_Core;

namespace XTI_PllWebAppApi.CustomerCase;

internal sealed partial class UploadMapImageAction : AppAction<UploadMapImageRequest, EmptyActionResult>
{
    private readonly AppDataFolder appDataFolder;

    public UploadMapImageAction(AppDataFolder appDataFolder)
    {
        this.appDataFolder = appDataFolder;
    }

    public async Task<EmptyActionResult> Execute(UploadMapImageRequest model, CancellationToken stoppingToken)
    {
        var match = Base64Regex().Match(model.Image);
        if(match.Success)
        {
            var prefix = match.Groups["Prefix"].Value;
            var extension = match.Groups["Extension"].Value;
            var base64Image = model.Image.Remove(0, prefix.Length);
            var bytes = Convert.FromBase64String(base64Image);
            var path = appDataFolder.FilePath($"{Guid.NewGuid():D}.{extension}");
            File.WriteAllBytes(path, bytes);
        }
        return new EmptyActionResult();
    }

    [GeneratedRegex("^(?<Prefix>data:image/(?<Extension>\\w+);base64,)")]
    private static partial Regex Base64Regex();
}
