using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CPW_PllDB.SqlServer.Migrations
{
    /// <inheritdoc />
    public partial class Initial01 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cases",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    CityworksBusinessCaseID = table.Column<long>(type: "bigint", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Location = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CaseStatusCode = table.Column<int>(type: "int", nullable: false),
                    X = table.Column<decimal>(type: "decimal(17,8)", precision: 17, scale: 8, nullable: false),
                    Y = table.Column<decimal>(type: "decimal(17,8)", precision: 17, scale: 8, nullable: false),
                    TimeCreated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    TimeCompleted = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    TimeDeleted = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CityworksID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    PersonKey = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    PersonName = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    CellPhone = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "CaseDataGroups",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaseID = table.Column<int>(type: "int", nullable: false),
                    CityworksDataGroupDefinitionID = table.Column<long>(type: "bigint", nullable: false),
                    ServiceType = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    CityworksID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseDataGroups", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CaseDataGroups_Cases_CaseID",
                        column: x => x.CaseID,
                        principalTable: "Cases",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CasePaymentTransactions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaseID = table.Column<int>(type: "int", nullable: false),
                    TransactionKey = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AmountReceived = table.Column<decimal>(type: "decimal(22,4)", precision: 22, scale: 4, nullable: false),
                    TimeStarted = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    TimeProcessed = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    GatewayID = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CasePaymentTransactions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CasePaymentTransactions_Cases_CaseID",
                        column: x => x.CaseID,
                        principalTable: "Cases",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CaseRelatedDocuments",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaseID = table.Column<int>(type: "int", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    TempFilePath = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    CityworksLabelID = table.Column<long>(type: "bigint", nullable: false),
                    CityworksID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseRelatedDocuments", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CaseRelatedDocuments_Cases_CaseID",
                        column: x => x.CaseID,
                        principalTable: "Cases",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CaseServiceTypes",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaseID = table.Column<int>(type: "int", nullable: false),
                    ServiceType = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseServiceTypes", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CaseServiceTypes_Cases_CaseID",
                        column: x => x.CaseID,
                        principalTable: "Cases",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CasePersons",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaseID = table.Column<int>(type: "int", nullable: false),
                    PersonID = table.Column<int>(type: "int", nullable: false),
                    CityworksRoleID = table.Column<long>(type: "bigint", nullable: false),
                    CityworksID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CasePersons", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CasePersons_Cases_CaseID",
                        column: x => x.CaseID,
                        principalTable: "Cases",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CasePersons_Persons_PersonID",
                        column: x => x.PersonID,
                        principalTable: "Persons",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CaseDataGroupDetails",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataGroupID = table.Column<int>(type: "int", nullable: false),
                    CityworksDetailDefinitionID = table.Column<long>(type: "bigint", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    CityworksID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseDataGroupDetails", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CaseDataGroupDetails_CaseDataGroups_DataGroupID",
                        column: x => x.DataGroupID,
                        principalTable: "CaseDataGroups",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CasePaymentTransactionFees",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionID = table.Column<int>(type: "int", nullable: false),
                    CityworksFeeID = table.Column<long>(type: "bigint", nullable: false),
                    FeeAmount = table.Column<decimal>(type: "decimal(22,4)", precision: 22, scale: 4, nullable: false),
                    AmountPaid = table.Column<decimal>(type: "decimal(22,4)", precision: 22, scale: 4, nullable: false),
                    CityworksPaymentID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CasePaymentTransactionFees", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CasePaymentTransactionFees_CasePaymentTransactions_TransactionID",
                        column: x => x.TransactionID,
                        principalTable: "CasePaymentTransactions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CaseDataGroupDetails_DataGroupID",
                table: "CaseDataGroupDetails",
                column: "DataGroupID");

            migrationBuilder.CreateIndex(
                name: "IX_CaseDataGroups_CaseID",
                table: "CaseDataGroups",
                column: "CaseID");

            migrationBuilder.CreateIndex(
                name: "IX_CasePaymentTransactionFees_TransactionID",
                table: "CasePaymentTransactionFees",
                column: "TransactionID");

            migrationBuilder.CreateIndex(
                name: "IX_CasePaymentTransactions_CaseID",
                table: "CasePaymentTransactions",
                column: "CaseID");

            migrationBuilder.CreateIndex(
                name: "IX_CasePaymentTransactions_TransactionKey",
                table: "CasePaymentTransactions",
                column: "TransactionKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CasePersons_CaseID",
                table: "CasePersons",
                column: "CaseID");

            migrationBuilder.CreateIndex(
                name: "IX_CasePersons_PersonID",
                table: "CasePersons",
                column: "PersonID");

            migrationBuilder.CreateIndex(
                name: "IX_CaseRelatedDocuments_CaseID",
                table: "CaseRelatedDocuments",
                column: "CaseID");

            migrationBuilder.CreateIndex(
                name: "IX_CaseServiceTypes_CaseID",
                table: "CaseServiceTypes",
                column: "CaseID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CaseDataGroupDetails");

            migrationBuilder.DropTable(
                name: "CasePaymentTransactionFees");

            migrationBuilder.DropTable(
                name: "CasePersons");

            migrationBuilder.DropTable(
                name: "CaseRelatedDocuments");

            migrationBuilder.DropTable(
                name: "CaseServiceTypes");

            migrationBuilder.DropTable(
                name: "CaseDataGroups");

            migrationBuilder.DropTable(
                name: "CasePaymentTransactions");

            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropTable(
                name: "Cases");
        }
    }
}
