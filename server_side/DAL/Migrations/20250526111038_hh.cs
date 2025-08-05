using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class hh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReallyEnd",
                table: "Rentals",
                newName: "ReallyExit");

            migrationBuilder.AddColumn<DateTime>(
                name: "ReallyEnter",
                table: "Rentals",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReallyEnter",
                table: "Rentals");

            migrationBuilder.RenameColumn(
                name: "ReallyExit",
                table: "Rentals",
                newName: "ReallyEnd");
        }
    }
}
