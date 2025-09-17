using Mapster;
using Mat.Database;
using Mat.Database.Model;
using Mat.Dtos;
using Mat.Services;
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
                async (int id, MatDbContext db, IUserService userService) =>
                {
                    var user = await userService.GetCurrentUserAsync();
                    if (user is null)
                        return Results.Unauthorized();

                    var recipe = await db
                        .Recipes.Where(r => r.UserId == user.Id)
                        .Include(r => r.Ingredients)
                        .FirstOrDefaultAsync(r => r.Id == id);

                    if (recipe is null)
                        return Results.NotFound();

                    return Results.Ok(recipe.Adapt<RecipeDto>());
                }
            )
            .Produces(StatusCodes.Status404NotFound)
            .Produces<RecipeDto>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized);

        recipeGroup
            .MapPost(
                "",
                async (RecipeDto recipeDto, MatDbContext db, IUserService userService) =>
                {
                    var user = await userService.GetCurrentUserAsync();
                    if (user is null)
                        return Results.Unauthorized();

                    var recipe = recipeDto.Adapt<Recipe>();
                    recipe.User = user;

                    db.Recipes.Add(recipe);

                    await db.SaveChangesAsync();

                    return Results.Created($"/recipes/{recipe.Id}", recipeDto);
                }
            )
            .Produces<RecipeDto>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status401Unauthorized);

        recipeGroup
            .MapPut(
                "{id}",
                async (
                    int id,
                    RecipeDto updatedRecipeDto,
                    MatDbContext db,
                    IUserService userService
                ) =>
                {
                    var user = await userService.GetCurrentUserAsync();
                    if (user is null)
                        return Results.Unauthorized();

                    var recipe = await db.Recipes.FirstOrDefaultAsync(r => r.Id == id);

                    if (recipe is null)
                        return Results.NotFound();

                    if (recipe.UserId != user.Id)
                        return Results.Unauthorized();

                    updatedRecipeDto.Adapt(recipe);

                    await db.SaveChangesAsync();

                    return Results.NoContent();
                }
            )
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound)
            .Produces(StatusCodes.Status401Unauthorized);
        ;

        recipeGroup
            .MapDelete(
                "{id:int}",
                async (int id, MatDbContext db, IUserService userService) =>
                {
                    var user = await userService.GetCurrentUserAsync();
                    if (user is null)
                        return Results.Unauthorized();

                    if (await db.Recipes.FirstOrDefaultAsync(r => r.Id == id) is Recipe recipe)
                    {
                        if (recipe.UserId != user.Id)
                            return Results.Unauthorized();
                        db.Recipes.Remove(recipe);

                        await db.SaveChangesAsync();

                        return Results.NoContent();
                    }

                    return Results.NotFound();
                }
            )
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound)
            .Produces(StatusCodes.Status401Unauthorized);
        ;
    }
}
