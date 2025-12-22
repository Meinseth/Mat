using Mat.Database.Model;

namespace Mat.Services;

public interface IUserService
{
    Task<User?> GetCurrentUserAsync();
    Task<List<User>> GetUsersAsync(User user);
}
