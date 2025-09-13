using Mapster;
using Mat.Database.Model;
using Mat.Dtos;

namespace Mat.Mappings;

public static class MappingConfig
{
    public static void RegisterMappings()
    {
        TypeAdapterConfig<Recipe, RecipeDto>
            .NewConfig()
            .Map(dest => dest.Id, src => src.Id)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Instructions, src => src.Instructions)
            .Map(dest => dest.CookingTime, src => src.CookingTime)
            .Map(dest => dest.Servings, src => src.Servings)
            .Map(dest => dest.Ingredients, src => src.Ingredients);

        TypeAdapterConfig<Ingredient, IngredientDto>
            .NewConfig()
            .Map(dest => dest.Id, src => src.Id)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Amount, src => src.Amount)
            .Map(dest => dest.Unit, src => src.Unit);

        TypeAdapterConfig<User, UserDto>
            .NewConfig()
            .Map(dest => dest.Id, src => src.Id)
            .Map(dest => dest.Username, src => src.Username)
            .Map(dest => dest.Email, src => src.Email)
            .Map(dest => dest.FirstName, src => src.FirstName)
            .Map(dest => dest.LastName, src => src.LastName)
            .Map(dest => dest.Recipes, src => src.Recipes);
    }
}
