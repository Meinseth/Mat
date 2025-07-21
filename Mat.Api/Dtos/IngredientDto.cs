using Mat.Enums;

namespace Mat.Dtos;

public class IngredientDto
{
    public required string Name { get; set; }
    public required int Amount { get; set; }
    public Unit Unit { get; set; }
}
