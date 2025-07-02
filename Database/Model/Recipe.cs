using System.ComponentModel.DataAnnotations;

namespace Mat.Database.Model;

public record Recipe(
    int Id,
    [property: StringLength(64)] string Name,
    string Instructions,
    int CookingTime,
    int Servings
) : Tracker
{
    public List<Ingredient> Ingredients { get; set; } = [];
}
