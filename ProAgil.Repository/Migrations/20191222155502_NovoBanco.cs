using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProAgil.Repository.Migrations
{
    public partial class NovoBanco : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Eventos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Local = table.Column<string>(nullable: true),
                    DataEvento = table.Column<DateTime>(nullable: false),
                    Tema = table.Column<string>(nullable: true),
                    QtdPessoas = table.Column<int>(nullable: false),
                    ImagemURL = table.Column<string>(nullable: true),
                    Telefone = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Eventos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Palestrante",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(nullable: true),
                    MiniCurriculo = table.Column<string>(nullable: true),
                    ImagemURL = table.Column<string>(nullable: true),
                    Telefone = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Palestrante", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Lotes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(nullable: true),
                    Preco = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DataInicio = table.Column<DateTime>(nullable: true),
                    DataFim = table.Column<DateTime>(nullable: true),
                    Quantidade = table.Column<int>(nullable: false),
                    EventoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lotes_Eventos_EventoId",
                        column: x => x.EventoId,
                        principalTable: "Eventos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PalestrantesEventos",
                columns: table => new
                {
                    PalestranteId = table.Column<int>(nullable: false),
                    EventoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PalestrantesEventos", x => new { x.EventoId, x.PalestranteId });
                    table.ForeignKey(
                        name: "FK_PalestrantesEventos_Eventos_EventoId",
                        column: x => x.EventoId,
                        principalTable: "Eventos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PalestrantesEventos_Palestrante_PalestranteId",
                        column: x => x.PalestranteId,
                        principalTable: "Palestrante",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RedeSociais",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(nullable: true),
                    URL = table.Column<string>(nullable: true),
                    EventoId = table.Column<int>(nullable: true),
                    PalestranteId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RedeSociais", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RedeSociais_Eventos_EventoId",
                        column: x => x.EventoId,
                        principalTable: "Eventos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RedeSociais_Palestrante_PalestranteId",
                        column: x => x.PalestranteId,
                        principalTable: "Palestrante",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lotes_EventoId",
                table: "Lotes",
                column: "EventoId");

            migrationBuilder.CreateIndex(
                name: "IX_PalestrantesEventos_PalestranteId",
                table: "PalestrantesEventos",
                column: "PalestranteId");

            migrationBuilder.CreateIndex(
                name: "IX_RedeSociais_EventoId",
                table: "RedeSociais",
                column: "EventoId");

            migrationBuilder.CreateIndex(
                name: "IX_RedeSociais_PalestranteId",
                table: "RedeSociais",
                column: "PalestranteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lotes");

            migrationBuilder.DropTable(
                name: "PalestrantesEventos");

            migrationBuilder.DropTable(
                name: "RedeSociais");

            migrationBuilder.DropTable(
                name: "Eventos");

            migrationBuilder.DropTable(
                name: "Palestrante");
        }
    }
}
