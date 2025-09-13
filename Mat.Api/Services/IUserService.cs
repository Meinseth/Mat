using System.Security.Claims;

namespace Mat.Services;

public interface IUserService
{
    Task EnsureUserExistsAsync(ClaimsPrincipal principal);
}
