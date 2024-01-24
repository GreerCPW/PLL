// Generated Code
namespace PllWebApp.ApiControllers;
[Authorize]
public sealed partial class WipCasesController : Controller
{
    private readonly PllAppApi api;
    public WipCasesController(PllAppApi api)
    {
        this.api = api;
    }

    [HttpPost]
    public Task<ResultContainer<int>> AddCase([FromBody] long model, CancellationToken ct)
    {
        return api.Group("WipCases").Action<long, int>("AddCase").Execute(model, ct);
    }

    [HttpPost]
    public Task<ResultContainer<WipCaseModel[]>> GetIncompleteCases(CancellationToken ct)
    {
        return api.Group("WipCases").Action<EmptyRequest, WipCaseModel[]>("GetIncompleteCases").Execute(new EmptyRequest(), ct);
    }

    [HttpPost]
    public Task<ResultContainer<WipCaseModel[]>> GetSubmittedCases(CancellationToken ct)
    {
        return api.Group("WipCases").Action<EmptyRequest, WipCaseModel[]>("GetSubmittedCases").Execute(new EmptyRequest(), ct);
    }

    [HttpPost]
    public Task<ResultContainer<BusinessCaseModel[]>> GetBusinessCases(CancellationToken ct)
    {
        return api.Group("WipCases").Action<EmptyRequest, BusinessCaseModel[]>("GetBusinessCases").Execute(new EmptyRequest(), ct);
    }
}