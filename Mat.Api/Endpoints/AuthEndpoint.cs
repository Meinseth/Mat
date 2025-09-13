using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;

namespace Mat.Endpoints;

public static class AuthEndpoint
{
    public static void AddAuthEndpoints(this IEndpointRouteBuilder app, string redirectUri)
    {
        var authGroup = app.MapGroup("/api/auth/");
        authGroup.MapGet(
            "login",
            async httpContext =>
            {
                await httpContext.ChallengeAsync(
                    OpenIdConnectDefaults.AuthenticationScheme,
                    new AuthenticationProperties { RedirectUri = redirectUri }
                );
            }
        );
        authGroup.MapGet(
            "logout",
            async httpContext =>
            {
                await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                await httpContext.SignOutAsync(
                    OpenIdConnectDefaults.AuthenticationScheme,
                    new AuthenticationProperties { RedirectUri = redirectUri }
                );
            }
        );
    }
}
