using Mapster;
using Mat.Database.Model;
using Mat.Dtos;

namespace Mat.Mappings;

public static class MappingConfig
{
    public static void RegisterMappings()
    {
        TypeAdapterConfig<Recipe, RecipeDto>.NewConfig();
        TypeAdapterConfig<RecipeDto, Recipe>.NewConfig();
        TypeAdapterConfig<Ingredient, IngredientDto>.NewConfig();
        TypeAdapterConfig<User, UserDto>.NewConfig();
    }
}
