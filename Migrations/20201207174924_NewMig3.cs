using Microsoft.EntityFrameworkCore.Migrations;

namespace foto_full.Migrations
{
    public partial class NewMig3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddDate",
                table: "Comments");

            migrationBuilder.AddColumn<string>(
                name: "Date",
                table: "Comments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Comments");

            migrationBuilder.AddColumn<string>(
                name: "AddDate",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
