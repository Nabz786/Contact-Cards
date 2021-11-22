using Microsoft.EntityFrameworkCore.Migrations;

namespace ContactListAPI.Migrations
{
    public partial class updatedcontactmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailAddress",
                table: "Contacts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Occupation",
                table: "Contacts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StreetAddress",
                table: "Contacts",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailAddress",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "Occupation",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "StreetAddress",
                table: "Contacts");
        }
    }
}
