using Mat.Database.Model;
using Microsoft.EntityFrameworkCore;

class MatDbContext(DbContextOptions<MatDbContext> options) : DbContext(options)
{
    public DbSet<Recipe> Recipes => Set<Recipe>();
    public DbSet<Ingredient> Ingredients => Set<Ingredient>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
        optionsBuilder.UseSqlServer(
            "Server=localhost;Database=Mat;Trusted_Connection=True;TrustServerCertificate=True;"
        );
}
