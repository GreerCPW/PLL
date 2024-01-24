Import-Module PowershellForXti -Force

function Xti-AddPllDbMigration {
	param ([Parameter(Mandatory)]$Name)
	$env:DOTNET_ENVIRONMENT="Development"
	dotnet ef --startup-project ./PllWebApp/Internal/CPW_PllDbTool migrations add $Name --project ./PllWebApp/Internal/CPW_PllDB.SqlServer
}

function Xti-UpdatePllDb {
	param (
        [ValidateSet("Production", "Development", "Staging", "Test")]
        [Parameter(Mandatory, ValueFromPipelineByPropertyName = $true)]
        $EnvName
	)
	dotnet run --project ./PllWebApp/Internal/CPW_PllDbTool -- --environment $EnvName --command Update
}

function Xti-UpdateNpm {
	Start-Process -FilePath "cmd.exe" -WorkingDirectory PllWebApp/Apps/PllWebApp -ArgumentList "/c", "npm install @jasonbenfield/sharedwebapp@latest csr_utilityaccountwebapp@npm:@greercpw/utilityaccountwebapp@latest pll_giswebapp@npm:@greercpw/giswebapp@latest"
}