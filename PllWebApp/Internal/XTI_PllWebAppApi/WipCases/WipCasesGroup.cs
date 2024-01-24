using CPW_Cityworks.Abstractions;

namespace XTI_PllWebAppApi.WipCases;

public sealed class WipCasesGroup : AppApiGroupWrapper
{
    public WipCasesGroup(AppApiGroup source, IServiceProvider sp)
        : base(source)
    {
        AddCase = source.AddAction(nameof(AddCase), () => sp.GetRequiredService<AddCaseAction>());
        GetIncompleteCases = source.AddAction(nameof(GetIncompleteCases), () => sp.GetRequiredService<GetIncompleteCasesAction>());
        GetSubmittedCases = source.AddAction(nameof(GetSubmittedCases), () => sp.GetRequiredService<GetSubmittedCasesAction>());
        GetBusinessCases = source.AddAction(nameof(GetBusinessCases), () => sp.GetRequiredService<GetBusinessCasesAction>());
    }

    public AppApiAction<long, int> AddCase { get; }
    public AppApiAction<EmptyRequest, WipCaseModel[]> GetIncompleteCases { get; }
    public AppApiAction<EmptyRequest, WipCaseModel[]> GetSubmittedCases { get; }
    public AppApiAction<EmptyRequest, BusinessCaseModel[]> GetBusinessCases { get; }
}