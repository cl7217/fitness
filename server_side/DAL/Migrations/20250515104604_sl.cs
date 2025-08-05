using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class sl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Users_Username1",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_Username1",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "Username1",
                table: "Purchases");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Purchases",
                newName: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_UserId",
                table: "Purchases",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Users_UserId",
                table: "Purchases",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Users_UserId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_UserId",
                table: "Purchases");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Purchases",
                newName: "Username");

            migrationBuilder.AddColumn<int>(
                name: "Username1",
                table: "Purchases",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_Username1",
                table: "Purchases",
                column: "Username1");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Users_Username1",
                table: "Purchases",
                column: "Username1",
                principalTable: "Users",
                principalColumn: "Username");
        }
    }
}
