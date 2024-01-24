// Generated Code
namespace XTI_PllAppClient;
public sealed partial class WipCasesGroup : AppClientGroup
{
    public WipCasesGroup(IHttpClientFactory httpClientFactory, XtiTokenAccessor xtiTokenAccessor, AppClientUrl clientUrl, AppClientOptions options) : base(httpClientFactory, xtiTokenAccessor, clientUrl, options, "WipCases")
    {
        Actions = new WipCasesGroupActions(AddCase: CreatePostAction<long, int>("AddCase"), GetIncompleteCases: CreatePostAction<EmptyRequest, WipCaseModel[]>("GetIncompleteCases"), GetSubmittedCases: CreatePostAction<EmptyRequest, WipCaseModel[]>("GetSubmittedCases"), GetBusinessCases: CreatePostAction<EmptyRequest, BusinessCaseModel[]>("GetBusinessCases"));
    }

    public WipCasesGroupActions Actions { get; }

    public Task<int> AddCase(long model, CancellationToken ct = default) => Actions.AddCase.Post("", model, ct);
    public Task<WipCaseModel[]> GetIncompleteCases(CancellationToken ct = default) => Actions.GetIncompleteCases.Post("", new EmptyRequest(), ct);
    public Task<WipCaseModel[]> GetSubmittedCases(CancellationToken ct = default) => Actions.GetSubmittedCases.Post("", new EmptyRequest(), ct);
    public Task<BusinessCaseModel[]> GetBusinessCases(CancellationToken ct = default) => Actions.GetBusinessCases.Post("", new EmptyRequest(), ct);
    public sealed record WipCasesGroupActions(AppClientPostAction<long, int> AddCase, AppClientPostAction<EmptyRequest, WipCaseModel[]> GetIncompleteCases, AppClientPostAction<EmptyRequest, WipCaseModel[]> GetSubmittedCases, AppClientPostAction<EmptyRequest, BusinessCaseModel[]> GetBusinessCases);
}