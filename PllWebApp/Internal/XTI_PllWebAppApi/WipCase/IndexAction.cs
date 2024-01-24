namespace XTI_PllWebAppApi.WipCase;

internal sealed class IndexAction : AppAction<GetWipCaseRequest, WebViewResult>
{
    private readonly WebViewResultFactory viewFactory;

    public IndexAction(WebViewResultFactory viewFactory)
    {
        this.viewFactory = viewFactory;
    }

    public Task<WebViewResult> Execute(GetWipCaseRequest model, CancellationToken ct) =>
        Task.FromResult(viewFactory.Default("wipCase", "Application"));
}