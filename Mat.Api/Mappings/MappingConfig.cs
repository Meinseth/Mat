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
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Instructions, src => src.Instructions)
            .Map(dest => dest.CookingTime, src => src.CookingTime)
            .Map(dest => dest.Servings, src => src.Servings)
            .Map(dest => dest.Ingredients, src => src.Ingredients);
    }
}
