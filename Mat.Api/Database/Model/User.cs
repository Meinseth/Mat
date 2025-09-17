namespace Mat.Database.Model;

public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public ICollection<Recipe> Recipes { get; set; } = [];
}
