// Generated Code
namespace XTI_PllAppClient;
public sealed partial class Address
{
    public StreetAddress StreetAddress { get; set; } = new StreetAddress();
    public string[] AdditionalLines { get; set; } = new string[0];
    public string City { get; set; } = "";
    public string State { get; set; } = "";
    public ZipCode ZipCode { get; set; } = new ZipCode();
}