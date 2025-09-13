using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mat.Migrations
{
    /// <inheritdoc />
    public partial class UserRecipe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AuthentikUsername",
                table: "Users",
                newName: "Username"
            );

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Recipes",
                type: "integer",
                nullable: false,
                defaultValue: 0
            );

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_UserId",
                table: "Recipes",
                column: "UserId"
            );

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Users_UserId",
                table: "Recipes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Recipes_Users_UserId", table: "Recipes");

            migrationBuilder.DropIndex(name: "IX_Recipes_UserId", table: "Recipes");

            migrationBuilder.DropColumn(name: "UserId", table: "Recipes");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "AuthentikUsername"
            );
        }
    }
}
