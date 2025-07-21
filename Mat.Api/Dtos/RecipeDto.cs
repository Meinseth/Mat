using System.ComponentModel.DataAnnotations;

namespace Mat.Dtos;

public class RecipeDto
{
    [MaxLength(64)]
    public string? Name { get; set; }
    public string? Instructions { get; set; }
    public int? CookingTime { get; set; }
    public int? Servings { get; set; }
    public List<IngredientDto>? Ingredients { get; set; }
}
