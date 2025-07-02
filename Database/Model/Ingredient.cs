using System.ComponentModel.DataAnnotations;
using Mat.Enums;

namespace Mat.Database.Model
{
    public record Ingredient(
        int Id,
        [property: StringLength(64)] string Name,
        Unit Unit,
        int Amount,
        int RecipeId
    );
}
