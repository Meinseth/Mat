using Mapster;
using Mat.Database.Model;
using Mat.Dtos;
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
            async (RecipeDto recipeDto, MatDbContext db) =>
            {
                var recipe = recipeDto.Adapt<Recipe>();
                db.Recipes.Add(recipe);
                await db.SaveChangesAsync();
                return Results.Created($"/recipes/{recipe.Id}", recipe);
            }
        );

        recipes.MapPut(
            "/{id}",
            async (int id, Recipe updatedRecipe, MatDbContext db) =>
            {
                var recipe = await db.Recipes.FindAsync(id);

                if (recipe is null)
                    return Results.NotFound();

                recipe = updatedRecipe;

                await db.SaveChangesAsync();

                return Results.NoContent();
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
