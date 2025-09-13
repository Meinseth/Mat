using Mapster;
using Mat.Database;
using Mat.Database.Model;
using Mat.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Mat.Endpoints;

public static class RecipeEndpoint
{
    public static void AddRecipeEndpoints(this IEndpointRouteBuilder app)
    {
        var recipeGroup = app.MapGroup("/api/recipe/").RequireAuthorization();

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
            .Produces(StatusCodes.Status404NotFound)
            .Produces<RecipeDto>(StatusCodes.Status200OK);

        recipeGroup
            .MapPost(
                "",
                async (RecipeDto recipeDto, MatDbContext db) =>
                {
                    var recipe = recipeDto.Adapt<Recipe>();

                    db.Recipes.Add(recipe);

                    await db.SaveChangesAsync();

                    return Results.Created($"/recipes/{recipe.Id}", recipeDto);
                }
            )
            .Produces<RecipeDto>(StatusCodes.Status201Created);

        recipeGroup
            .MapPut(
                "{id}",
                async (int id, RecipeDto updatedRecipeDto, MatDbContext db) =>
                {
                    var recipe = await db.Recipes.FindAsync(id);

                    if (recipe is null)
                        return Results.NotFound();

                    updatedRecipeDto.Adapt(recipe);

                    await db.SaveChangesAsync();

                    return Results.NoContent();
                }
            )
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound);
        ;

        recipeGroup
            .MapDelete(
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
            )
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound);
        ;
    }
}
