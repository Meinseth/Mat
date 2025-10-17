using Mat.Enums;

namespace Mat.Dtos;

public sealed record IngredientDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required decimal Amount { get; set; }
    public Unit Unit { get; set; }
}
