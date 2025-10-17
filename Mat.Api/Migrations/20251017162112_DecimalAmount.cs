using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mat.Migrations
{
    /// <inheritdoc />
    public partial class DecimalAmount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CookingTime",
                table: "Recipes",
                newName: "CookingTimeMinutes"
            );

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Ingredients",
                type: "numeric(5,1)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CookingTimeMinutes",
                table: "Recipes",
                newName: "CookingTime"
            );

            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                table: "Ingredients",
                type: "integer",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(5,1)"
            );
        }
    }
}
