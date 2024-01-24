namespace CPW_Pll.Abstractions;

public sealed class SaveDataGroupRequest
{
    public SaveWipCaseDataGroupDetailRequest[] Details { get; set; } = new SaveWipCaseDataGroupDetailRequest[0];
}
