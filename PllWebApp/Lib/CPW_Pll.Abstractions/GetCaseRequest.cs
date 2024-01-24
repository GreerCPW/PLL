namespace CPW_Pll.Abstractions;

public sealed class GetCaseRequest
{
    public GetCaseRequest()
        : this(0)
    {
    }

    public GetCaseRequest(long caseID)
    {
        CaseID = caseID;
    }

    public long CaseID { get; set; }
}
