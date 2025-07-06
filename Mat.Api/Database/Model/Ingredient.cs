using System.ComponentModel.DataAnnotations;
using Mat.Enums;

namespace Mat.Database.Model
{
    public class Ingredient()
    {
        public int Id { get; set; }

        [MaxLength(64)]
        public required string Name { get; set; }
        public Unit Unit { get; set; }
        public int Amount { get; set; } // Amount in the specified unit
        public int RecipeId { get; set; } // Foreign key to the Recipe
    }
}
