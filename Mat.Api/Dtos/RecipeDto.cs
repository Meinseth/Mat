using System.ComponentModel.DataAnnotations;

namespace Mat.Dtos;

public sealed record RecipeDto
{
    public int Id { get; set; }

    [MaxLength(64)]
    public required string Name { get; set; }
    public required string Instructions { get; set; }
    public int CookingTime { get; set; }
    public int Servings { get; set; }
    public ICollection<IngredientDto> Ingredients { get; set; } = [];
}
