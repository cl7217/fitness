using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class sp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "start",
                table: "Rentals",
                newName: "Start");

            migrationBuilder.RenameColumn(
                name: "reallyEnd",
                table: "Rentals",
                newName: "ReallyEnd");

            migrationBuilder.RenameColumn(
                name: "end",
                table: "Rentals",
                newName: "End");

            migrationBuilder.RenameColumn(
                name: "discountPrecent",
                table: "HealthFunds",
                newName: "DiscountPrecent");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Users",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "Start",
                table: "Rentals",
                newName: "start");

            migrationBuilder.RenameColumn(
                name: "ReallyEnd",
                table: "Rentals",
                newName: "reallyEnd");

            migrationBuilder.RenameColumn(
                name: "End",
                table: "Rentals",
                newName: "end");

            migrationBuilder.RenameColumn(
                name: "DiscountPrecent",
                table: "HealthFunds",
                newName: "discountPrecent");
        }
    }
}
