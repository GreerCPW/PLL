// Generated Code
namespace XTI_PllAppClient;
public sealed partial class PllAppClient : AppClient
{
    public PllAppClient(IHttpClientFactory httpClientFactory, XtiTokenAccessor xtiTokenAccessor, AppClientUrl clientUrl, PllAppClientVersion version) : base(httpClientFactory, xtiTokenAccessor, clientUrl, "Pll", version.Value)
    {
        AfterPayment = CreateGroup((_clientFactory, _tokenAccessor, _url, _options) => new AfterPaymentGroup(_clientFactory, _tokenAccessor, _url, _options));
        Case = CreateGroup((_clientFactory, _tokenAccessor, _url, _options) => new CaseGroup(_clientFactory, _tokenAccessor, _url, _options));
        CustomerCase = CreateGroup((_clientFactory, _tokenAccessor, _url, _options) => new CustomerCaseGroup(_clientFactory, _tokenAccessor, _url, _options));
        Home = CreateGroup((_clientFactory, _tokenAccessor, _url, _options) => new HomeGroup(_clientFactory, _tokenAccessor, _url, _options));
        Payments = CreateGroup((_clientFactory, _tokenAccessor, _url, _options) => new PaymentsGroup(_clientFactory, _tokenAccessor, _url, _options));
        WipCase = CreateGroup((_clientFactory, _tokenAccessor, _url, _options) => new WipCaseGroup(_clientFactory, _tokenAccessor, _url, _options));
        WipCases = CreateGroup((_clientFactory, _tokenAccessor, _url, _options) => new WipCasesGroup(_clientFactory, _tokenAccessor, _url, _options));
    }

    public PllRoleNames RoleNames { get; } = PllRoleNames.Instance;
    public string AppName { get; } = "Pll";
    public AfterPaymentGroup AfterPayment { get; }

    public CaseGroup Case { get; }

    public CustomerCaseGroup CustomerCase { get; }

    public HomeGroup Home { get; }

    public PaymentsGroup Payments { get; }

    public WipCaseGroup WipCase { get; }

    public WipCasesGroup WipCases { get; }
}