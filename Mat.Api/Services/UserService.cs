using System.Security.Claims;
using Mat.Database;
using Mat.Database.Model;
using Microsoft.EntityFrameworkCore;

namespace Mat.Services;

public class UserService(MatDbContext db) : IUserService
{
    public async Task EnsureUserExistsAsync(ClaimsPrincipal principal)
    {
        var username =
            principal.FindFirst("preferred_username")?.Value
            ?? principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(username))
            throw new InvalidOperationException("Cannot locate username in token.");

        var existing = await db
            .Users.AsNoTracking()
            .SingleOrDefaultAsync(u => u.Username == username);

        if (existing is not null)
            return;

        var newUser = new User
        {
            Username = username,
            Email = principal.FindFirst(ClaimTypes.Email)?.Value,
            FirstName = principal.FindFirst(ClaimTypes.GivenName)?.Value,
            LastName = principal.FindFirst(ClaimTypes.Surname)?.Value,
        };

        db.Users.Add(newUser);
        await db.SaveChangesAsync();
    }
}
