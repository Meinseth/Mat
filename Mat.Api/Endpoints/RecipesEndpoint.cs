using Mapster;
using Mat.Database;
using Mat.Database.Model;
using Mat.Dtos;
using Mat.Services;
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
                async (MatDbContext db, IUserService userService) =>
                {
                    var user = await userService.GetCurrentUserAsync();
                    if (user is null)
                        return Results.Unauthorized();

                    var recipes = await db
                        .Recipes.AsNoTracking()
                        .Where(r => r.UserId == user.Id)
                        .ProjectToType<RecipeDto>()
                        .ToListAsync();

                    return Results.Ok(recipes);
                }
            )
            .Produces<IEnumerable<RecipeDto>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized);

        recipesGroup
            .MapGet(
                "{id:int}",
                async (int id, MatDbContext db, IUserService userService) =>
                {
                    var user = await userService.GetCurrentUserAsync();
                    if (user is null)
                        return Results.Unauthorized();

                    var recipe = await db
                        .Recipes.AsNoTracking()
                        .Where(r => r.UserId == user.Id && r.Id == id)
                        .ProjectToType<RecipeDto>()
                        .FirstOrDefaultAsync();

                    if (recipe is null)
                        return Results.NotFound();

                    return Results.Ok(recipe);
                }
            )
            .Produces<RecipeDto>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .Produces(StatusCodes.Status401Unauthorized);

        recipesGroup
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

        recipesGroup
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

                    var recipe = await db
                        .Recipes.Include(r => r.Ingredients)
                        .FirstOrDefaultAsync(r => r.Id == id);

                    if (recipe is null)
                        return Results.NotFound();

                    if (recipe.UserId != user.Id)
                        return Results.Unauthorized();

                    updatedRecipeDto.Adapt(recipe);

                    await db.SaveChangesAsync();

                    return Results.Ok(recipe.Adapt<RecipeDto>());
                }
            )
            .Produces<RecipeDto>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .Produces(StatusCodes.Status401Unauthorized);

        recipesGroup
            .MapDelete(
                "{id:int}",
                async (int id, MatDbContext db, IUserService userService) =>
                {
                    var user = await userService.GetCurrentUserAsync();
                    if (user is null)
                        return Results.Unauthorized();

                    var deleted = await db
                        .Recipes.Where(r => r.Id == id && r.UserId == user.Id)
                        .ExecuteDeleteAsync();

                    if (deleted is 0)
                        return Results.NotFound();

                    return Results.NoContent();
                }
            )
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound)
            .Produces(StatusCodes.Status401Unauthorized);
    }
}
