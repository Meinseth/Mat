using Mapster;
using Mat.Database.Model;
using Mat.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Mat.Endpoints;

public static class RecipesEndpoint
{
    public static void AddRecipesEndpoints(this IEndpointRouteBuilder app)
    {
        var recipesGroup = app.MapGroup("/recipes/");

        recipesGroup
            .MapGet(
                "",
                async (MatDbContext db) =>
                {
                    var recipes = await db.Recipes.Include(r => r.Ingredients).ToListAsync();

                    if (recipes is null || recipes.Count == 0)
                        return Results.NoContent();

                    return Results.Ok(recipes.Adapt<List<RecipeDto>>());
                }
            )
            .Produces<RecipeDto[]>();
    }
}
