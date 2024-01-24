namespace CPW_Pll.Abstractions;

public sealed class GetWipCaseRequest
{
    public GetWipCaseRequest()
        :this(0)
    {    
    }

    public GetWipCaseRequest(int caseID)
    {
        CaseID = caseID;
    }

    public int CaseID { get; set; }
}
