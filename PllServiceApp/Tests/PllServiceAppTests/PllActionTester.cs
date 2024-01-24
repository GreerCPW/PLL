using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using System;
using XTI_App.Abstractions;
using XTI_App.Api;
using XTI_App.Fakes;
using XTI_PllServiceAppApi;

namespace PllServiceAppTests;

internal static class PllActionTester
{
    public static PllActionTester<TModel, TResult> Create<TModel, TResult>(IServiceProvider services, Func<PllAppApi, AppApiAction<TModel, TResult>> getAction)
    {
        return new PllActionTester<TModel, TResult>(services, getAction);
    }
}

internal interface IPllActionTester
{
    IServiceProvider Services { get; }
    PllActionTester<TOtherModel, TOtherResult> Create<TOtherModel, TOtherResult>(Func<PllAppApi, AppApiAction<TOtherModel, TOtherResult>> getAction);
}

internal sealed class PllActionTester<TModel, TResult> : IPllActionTester
{
    private readonly Func<PllAppApi, AppApiAction<TModel, TResult>> getAction;

    public PllActionTester
    (
        IServiceProvider services,
        Func<PllAppApi, AppApiAction<TModel, TResult>> getAction
    )
    {
        Services = services;
        this.getAction = getAction;
    }

    public PllActionTester<TOtherModel, TOtherResult> Create<TOtherModel, TOtherResult>
    (
        Func<PllAppApi, AppApiAction<TOtherModel, TOtherResult>> getAction
    )
    {
        return PllActionTester.Create(Services, getAction);
    }

    public IServiceProvider Services { get; }

    public void Logout()
    {
        var currentUserName = Services.GetRequiredService<FakeCurrentUserName>();
        currentUserName.SetUserName(AppUserName.Anon);
    }

    public void LoginAsAdmin()
    {
        var currentUserName = Services.GetRequiredService<FakeCurrentUserName>();
        currentUserName.SetUserName(new AppUserName("admin.user"));
    }

    public void Login(params AppRoleName[]? roleNames) => Login(ModifierCategoryName.Default, ModifierKey.Default, roleNames);

    public void Login(ModifierCategoryName modCategory, ModifierKey modifier, params AppRoleName[]? roleNames)
    {
        var userContext = Services.GetRequiredService<FakeUserContext>();
        var userName = new AppUserName("loggedinUser");
        userContext.AddUser(userName);
        userContext.SetCurrentUser(userName);
        userContext.SetUserRoles(modCategory, modifier, roleNames ?? new AppRoleName[0]);
    }

    public Task<TResult> Execute(TModel model) =>
        Execute(model, ModifierKey.Default);

    public async Task<TResult> Execute(TModel model, ModifierKey modKey)
    {
        var appContext = Services.GetRequiredService<IAppContext>();
        var appApiFactory = Services.GetRequiredService<AppApiFactory>();
        var apiForSuperUser = (PllAppApi)appApiFactory.CreateForSuperUser();
        var actionForSuperUser = getAction(apiForSuperUser);
        var modKeyPath = modKey.Equals(ModifierKey.Default) ? "" : $"/{modKey.Value}";
        var appKey = Services.GetRequiredService<AppKey>();
        var userContext = Services.GetRequiredService<ISourceUserContext>();
        var pathAccessor = Services.GetRequiredService<FakeXtiPathAccessor>();
        var path = actionForSuperUser.Path.WithModifier(modKey ?? ModifierKey.Default);
        pathAccessor.SetPath(path);
        var currentUserName = Services.GetRequiredService<ICurrentUserName>();
        var currentUserAccess = new CurrentUserAccess(userContext, appContext, currentUserName);
        var apiUser = new AppApiUser(currentUserAccess, pathAccessor);
        var appApi = (PllAppApi)appApiFactory.Create(apiUser);
        var action = getAction(appApi);
        var result = await action.Invoke(model);
        return result;
    }
}