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
        app.MapGet(
            "callback",
            async httpContext =>
            {
                // This endpoint is handled automatically by the OIDC handler.
                // We just need to sign the user in with the cookie scheme.
                var result = await httpContext.AuthenticateAsync(
                    OpenIdConnectDefaults.AuthenticationScheme
                );
                if (!result.Succeeded)
                {
                    httpContext.Response.StatusCode = 401;
                    await httpContext.Response.WriteAsync("Authentication failed.");
                    return;
                }

                var claimsPrincipal = result.Principal!;

                await httpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    claimsPrincipal,
                    new AuthenticationProperties
                    {
                        IsPersistent = true,
                        ExpiresUtc = DateTimeOffset.UtcNow.AddHours(8),
                    }
                );

                httpContext.Response.Redirect(redirectUri);
            }
        );
    }
}
