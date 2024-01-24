// Generated Code
namespace XTI_PllAppClient;
public sealed class PllAppClientVersion
{
    public static PllAppClientVersion Version(string value) => new PllAppClientVersion(value);
    public PllAppClientVersion(IHostEnvironment hostEnv) : this(getValue(hostEnv))
    {
    }

    private static string getValue(IHostEnvironment hostEnv)
    {
        string value;
        if (hostEnv.IsProduction())
        {
            value = "V3";
        }
        else
        {
            value = "Current";
        }

        return value;
    }

    private PllAppClientVersion(string value)
    {
        Value = value;
    }

    public string Value { get; }
}