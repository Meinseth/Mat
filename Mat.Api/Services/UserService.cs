using System.Security.Claims;
using Mat.Database;
using Mat.Database.Model;
using Microsoft.EntityFrameworkCore;

namespace Mat.Services;

public class UserService(IHttpContextAccessor httpContextAccessor, MatDbContext db) : IUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
    private readonly MatDbContext _db = db;

    public async Task<User?> GetCurrentUserAsync()
    {
        var httpContext = _httpContextAccessor.HttpContext;

        if (httpContext?.User.Identity?.IsAuthenticated != true)
            return null;

        var claims = httpContext.User.Claims;

        var username = claims.FirstOrDefault(c => c.Type == "preferred_username")?.Value;
        if (string.IsNullOrEmpty(username))
            return null;

        var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == username);
        if (user is null)
        {
            user = new User
            {
                Username = username,
                Email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                FirstName = claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value,
                LastName = claims.FirstOrDefault(c => c.Type == ClaimTypes.Surname)?.Value,
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
        }

        return user;
    }

    public async Task<List<User>> GetUsersAsync(User user) =>
        await _db.Users.Where(u => u.Id != user.Id).ToListAsync();
}
