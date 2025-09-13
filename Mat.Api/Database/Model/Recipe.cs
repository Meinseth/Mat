using System.ComponentModel.DataAnnotations;

namespace Mat.Database.Model;

public class Recipe : Tracker
{
    public int Id { get; set; }

    [MaxLength(64)]
    public required string Name { get; set; }
    public required string Instructions { get; set; }
    public int CookingTime { get; set; } // Minutes
    public int Servings { get; set; }
    public IEnumerable<Ingredient> Ingredients { get; set; } = [];
    public int UserId { get; set; }
    public required User User { get; set; }
}
