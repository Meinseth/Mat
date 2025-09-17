namespace Mat.Dtos;

public sealed record UserDto
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
