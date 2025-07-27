using Mapster;
using Mat.Database.Model;
using Mat.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Mat.Endpoints;

public static class RecipeEndpoint
{
    public static void AddRecipeEndpoints(this IEndpointRouteBuilder app)
    {
        var recipeGroup = app.MapGroup("/recipe/");

        recipeGroup
            .MapGet(
                "{id:int}",
                async (int id, MatDbContext db) =>
                {
                    var recipe = await db
                        .Recipes.Include(r => r.Ingredients)
                        .FirstOrDefaultAsync(r => r.Id == id);

                    if (recipe is null)
                        return Results.NotFound();

                    return Results.Ok(recipe.Adapt<RecipeDto>());
                }
            )
            .Produces<RecipeDto>();

        recipeGroup.MapPost(
            "",
            async (RecipeDto recipeDto, MatDbContext db) =>
            {
                var recipe = recipeDto.Adapt<Recipe>();

                db.Recipes.Add(recipe);

                await db.SaveChangesAsync();

                return Results.Created($"/recipes/{recipe.Id}", recipeDto);
            }
        );

        recipeGroup.MapPut(
            "/{id}",
            async (int id, RecipeDto updatedRecipeDto, MatDbContext db) =>
            {
                var recipe = await db.Recipes.FindAsync(id);

                if (recipe is null)
                    return Results.NotFound();

                updatedRecipeDto.Adapt(recipe);

                await db.SaveChangesAsync();

                return Results.NoContent();
            }
        );

        recipeGroup.MapDelete(
            "{id:int}",
            async (int id, MatDbContext db) =>
            {
                if (await db.Recipes.FindAsync(id) is Recipe recipe)
                {
                    db.Recipes.Remove(recipe);

                    await db.SaveChangesAsync();

                    return Results.NoContent();
                }

                return Results.NotFound();
            }
        );
    }
}
