using Mat.Database.Model;
using Microsoft.EntityFrameworkCore;

namespace Mat.Endpoints;

public static class RecipesEndpoint
{
    public static void AddRecipesEndpoints(this IEndpointRouteBuilder app)
    {
        var recipes = app.MapGroup("/recipes/");

        recipes.MapGet(
            "{id:int}",
            async (int id, MatDbContext db) =>
            {
                return await db
                    .Recipes.Include(r => r.Ingredients)
                    .FirstOrDefaultAsync(r => r.Id == id);
            }
        );

        recipes.MapGet(
            "",
            async (MatDbContext db) =>
            {
                return await db.Recipes.ToListAsync();
            }
        );

        recipes.MapPost(
            "",
            async (Recipe recipe, MatDbContext db) =>
            {
                db.Recipes.Add(recipe);
                await db.SaveChangesAsync();
                return Results.Created($"/recipes/{recipe.Id}", recipe);
            }
        );

        recipes.MapDelete(
            "{id:int}",
            async (int id, MatDbContext db) =>
            {
                if (await db.Recipes.FindAsync(id) is Recipe todo)
                {
                    db.Recipes.Remove(todo);
                    await db.SaveChangesAsync();
                    return Results.NoContent();
                }

                return Results.NotFound();
            }
        );
    }
}
