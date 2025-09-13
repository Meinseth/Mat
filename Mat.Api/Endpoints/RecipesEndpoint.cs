using Mapster;
using Mat.Database;
using Mat.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Mat.Endpoints;

public static class RecipesEndpoint
{
    public static void AddRecipesEndpoints(this IEndpointRouteBuilder app)
    {
        var recipesGroup = app.MapGroup("/api/recipes/").RequireAuthorization();

        recipesGroup
            .MapGet(
                "",
                async (MatDbContext db) =>
                {
                    var recipes = await db.Recipes.Include(r => r.Ingredients).ToListAsync();

                    return Results.Ok(recipes.Adapt<List<RecipeDto>>());
                }
            )
            .Produces<RecipeDto[]>(StatusCodes.Status200OK);
    }
}
