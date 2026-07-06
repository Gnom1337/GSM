using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GSM.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Density = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Tanks",
                columns: table => new
                {
                    TankId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TankNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CapacityLiters = table.Column<double>(type: "float", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CurentVolumeLiters = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tanks", x => x.TankId);
                    table.ForeignKey(
                        name: "FK_Tanks_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DailyBalances",
                columns: table => new
                {
                    DailyBalanceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BalanceDate = table.Column<DateOnly>(type: "date", nullable: false),
                    TankId = table.Column<int>(type: "int", nullable: false),
                    OpeningVolume = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalReceived = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalDispatched = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ClosingVolumeCalculated = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ClosingVolumeActual = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LossLiters = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyBalances", x => x.DailyBalanceId);
                    table.ForeignKey(
                        name: "FK_DailyBalances_Tanks_TankId",
                        column: x => x.TankId,
                        principalTable: "Tanks",
                        principalColumn: "TankId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dispatches",
                columns: table => new
                {
                    DispatchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DispatchDate = table.Column<DateOnly>(type: "date", nullable: false),
                    TankId = table.Column<int>(type: "int", nullable: false),
                    TruckNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DriverName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecipientOrg = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VolumeInvoiceLiters = table.Column<double>(type: "float", nullable: false),
                    WaybillNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<TimeOnly>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dispatches", x => x.DispatchId);
                    table.ForeignKey(
                        name: "FK_Dispatches_Tanks_TankId",
                        column: x => x.TankId,
                        principalTable: "Tanks",
                        principalColumn: "TankId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Dispatches_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TankMeasurements",
                columns: table => new
                {
                    TankMeasurementsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TankId = table.Column<int>(type: "int", nullable: false),
                    MeasuredAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VolumeLiters = table.Column<double>(type: "float", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TankMeasurements", x => x.TankMeasurementsId);
                    table.ForeignKey(
                        name: "FK_TankMeasurements_Tanks_TankId",
                        column: x => x.TankId,
                        principalTable: "Tanks",
                        principalColumn: "TankId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TankMeasurements_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WagonReceipts",
                columns: table => new
                {
                    WagonReceiptId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WagonNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReceiptDate = table.Column<DateOnly>(type: "date", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    TankId = table.Column<int>(type: "int", nullable: false),
                    VolumeInvoiceLiters = table.Column<double>(type: "float", nullable: false),
                    VolumeActualLiters = table.Column<double>(type: "float", nullable: false),
                    DiscrepancyLiters = table.Column<double>(type: "float", nullable: false),
                    WaybillNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<TimeOnly>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WagonReceipts", x => x.WagonReceiptId);
                    table.ForeignKey(
                        name: "FK_WagonReceipts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WagonReceipts_Tanks_TankId",
                        column: x => x.TankId,
                        principalTable: "Tanks",
                        principalColumn: "TankId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WagonReceipts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DailyBalances_TankId",
                table: "DailyBalances",
                column: "TankId");

            migrationBuilder.CreateIndex(
                name: "IX_Dispatches_TankId",
                table: "Dispatches",
                column: "TankId");

            migrationBuilder.CreateIndex(
                name: "IX_Dispatches_UserId",
                table: "Dispatches",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TankMeasurements_TankId",
                table: "TankMeasurements",
                column: "TankId");

            migrationBuilder.CreateIndex(
                name: "IX_TankMeasurements_UserId",
                table: "TankMeasurements",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tanks_ProductId",
                table: "Tanks",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_WagonReceipts_ProductId",
                table: "WagonReceipts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_WagonReceipts_TankId",
                table: "WagonReceipts",
                column: "TankId");

            migrationBuilder.CreateIndex(
                name: "IX_WagonReceipts_UserId",
                table: "WagonReceipts",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyBalances");

            migrationBuilder.DropTable(
                name: "Dispatches");

            migrationBuilder.DropTable(
                name: "TankMeasurements");

            migrationBuilder.DropTable(
                name: "WagonReceipts");

            migrationBuilder.DropTable(
                name: "Tanks");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
