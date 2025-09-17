using Mat.Database.Model;

namespace Mat.Services;

public interface IUserService
{
    Task<User?> GetCurrentUserAsync();
}
