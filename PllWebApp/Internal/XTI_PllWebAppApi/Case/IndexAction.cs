namespace XTI_PllWebAppApi.Case;

internal sealed class IndexAction : AppAction<GetCaseRequest, WebViewResult>
{
    private readonly WebViewResultFactory viewFactory;

    public IndexAction(WebViewResultFactory viewFactory)
    {
        this.viewFactory = viewFactory;
    }

    public Task<WebViewResult> Execute(GetCaseRequest getRequest, CancellationToken ct) =>
        Task.FromResult(viewFactory.Default("case", "Application"));
}