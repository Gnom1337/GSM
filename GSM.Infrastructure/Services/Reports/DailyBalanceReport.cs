using GSM.Domain.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

public class DailyBalanceReport : IDocument
{
    private readonly DateOnly _date;
    private readonly List<DailyBalance> _balances;

    public DailyBalanceReport(
        DateOnly date,
        List<DailyBalance> balances)
    {
        _date = date;
        _balances = balances;
    }


    public DocumentMetadata GetMetadata()
    {
        return DocumentMetadata.Default;
    }


    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            page.Size(PageSizes.A4);

            page.MarginTop(30);
            page.MarginBottom(30);
            page.MarginLeft(25);
            page.MarginRight(25);


            // =====================================================
            // HEADER
            // =====================================================

            page.Header()
                .Column(column =>
                {
                    column.Item()
                        .Row(row =>
                        {
                            // ЛОГОТИП
                            row.ConstantItem(110)
                                .Height(60)
                                .AlignMiddle()
                                .AlignLeft()
                                .Image(GetLogoPath());


                            // ЗАГОЛОВОК
                            row.RelativeItem()
                                .AlignMiddle()
                                .AlignCenter()
                                .Column(title =>
                                {
                                    title.Item()
                                        .Text("СУТОЧНЫЙ БАЛАНС")
                                        .FontSize(18)
                                        .Bold();

                                    title.Item()
                                        .PaddingTop(4)
                                        .Text(
                                            $"за {_date:dd.MM.yyyy}"
                                        )
                                        .FontSize(11)
                                        .FontColor(
                                            Colors.Grey.Darken2
                                        );
                                });


                            // Пустое место справа
                            row.ConstantItem(110);
                        });


                    column.Item()
                        .PaddingTop(12)
                        .LineHorizontal(1)
                        .LineColor(Colors.Grey.Medium);
                });


            // =====================================================
            // CONTENT
            // =====================================================

            page.Content()
                .PaddingTop(20)
                .Column(column =>
                {
                    column.Item()
                        .PaddingBottom(12)
                        .Text(
                            $"Суточный баланс на {_date:dd.MM.yyyy}"
                        )
                        .FontSize(13)
                        .Bold();


                    // =================================================
                    // TABLE
                    // =================================================

                    column.Item()
                        .Table(table =>
                        {
                            // -----------------------------
                            // COLUMNS
                            // -----------------------------

                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn(2.2f);
                                columns.RelativeColumn(1.3f);
                                columns.RelativeColumn(1.3f);
                                columns.RelativeColumn(1.3f);
                                columns.RelativeColumn(1.3f);
                                columns.RelativeColumn(1.3f);
                            });


                            // -----------------------------
                            // HEADER
                            // -----------------------------

                            table.Header(header =>
                            {
                                header.Cell()
                                    .Element(HeaderCell)
                                    .AlignCenter()
                                    .Text("Резервуар");

                                header.Cell()
                                    .Element(HeaderCell)
                                    .AlignCenter()
                                    .Text("Начало");

                                header.Cell()
                                    .Element(HeaderCell)
                                    .AlignCenter()
                                    .Text("Приход");

                                header.Cell()
                                    .Element(HeaderCell)
                                    .AlignCenter()
                                    .Text("Расход");

                                header.Cell()
                                    .Element(HeaderCell)
                                    .AlignCenter()
                                    .Text("Факт");

                                header.Cell()
                                    .Element(HeaderCell)
                                    .AlignCenter()
                                    .Text("Потери");
                            });


                            // -----------------------------
                            // DATA
                            // -----------------------------

                            foreach (var item in _balances)
                            {
                                table.Cell()
                                    .Element(DataCell)
                                    .Text(
                                        item.Tank?.TankNumber ?? "-"
                                    );


                                table.Cell()
                                    .Element(NumberCell)
                                    .Text(
                                        item.OpeningVolume
                                            .ToString("N2")
                                    );


                                table.Cell()
                                    .Element(NumberCell)
                                    .Text(
                                        item.TotalReceived
                                            .ToString("N2")
                                    );


                                table.Cell()
                                    .Element(NumberCell)
                                    .Text(
                                        item.TotalDispatched
                                            .ToString("N2")
                                    );


                                table.Cell()
                                    .Element(NumberCell)
                                    .Text(
                                        item.ClosingVolumeActual
                                            .ToString("N2")
                                    );


                                table.Cell()
                                    .Element(NumberCell)
                                    .Text(
                                        item.LossLiters
                                            .ToString("N2")
                                    );
                            }


                            // -----------------------------
                            // TOTAL
                            // -----------------------------

                            table.Cell()
                                .Element(TotalCell)
                                .Text("ИТОГО");


                            table.Cell()
                                .Element(TotalNumberCell)
                                .Text(
                                    _balances
                                        .Sum(x => x.OpeningVolume)
                                        .ToString("N2")
                                );


                            table.Cell()
                                .Element(TotalNumberCell)
                                .Text(
                                    _balances
                                        .Sum(x => x.TotalReceived)
                                        .ToString("N2")
                                );


                            table.Cell()
                                .Element(TotalNumberCell)
                                .Text(
                                    _balances
                                        .Sum(x => x.TotalDispatched)
                                        .ToString("N2")
                                );


                            table.Cell()
                                .Element(TotalNumberCell)
                                .Text(
                                    _balances
                                        .Sum(x => x.ClosingVolumeActual)
                                        .ToString("N2")
                                );


                            table.Cell()
                                .Element(TotalNumberCell)
                                .Text(
                                    _balances
                                        .Sum(x => x.LossLiters)
                                        .ToString("N2")
                                );
                        });
                });


            // =====================================================
            // FOOTER
            // =====================================================

            page.Footer()
                .PaddingTop(10)
                .Row(row =>
                {
                    row.RelativeItem()
                        .Text(
                            $"Сформировано: {DateTime.Now:dd.MM.yyyy HH:mm}"
                        )
                        .FontSize(8)
                        .FontColor(
                            Colors.Grey.Darken1
                        );


                    row.RelativeItem()
                        .AlignRight()
                        .Text(text =>
                        {
                            text.Span("Страница ")
                                .FontSize(8);

                            text.CurrentPageNumber()
                                .FontSize(8);

                            text.Span(" из ")
                                .FontSize(8);

                            text.TotalPages()
                                .FontSize(8);
                        });
                });
        });
    }


    // =====================================================
    // LOGO
    // =====================================================

    private static string GetLogoPath()
    {
        return Path.Combine(
            AppContext.BaseDirectory,
            "Services",
            "Reports",
            "Tatneft_Logo.png"
        );
    }


    // =====================================================
    // TABLE STYLES
    // =====================================================

    private static IContainer HeaderCell(IContainer container)
    {
        return container
            .Background(Colors.Grey.Lighten2)
            .Border(1)
            .BorderColor(Colors.Grey.Darken1)
            .Padding(7)
            .AlignMiddle();
    }


    private static IContainer DataCell(IContainer container)
    {
        return container
            .Border(1)
            .BorderColor(Colors.Grey.Lighten1)
            .Padding(7)
            .AlignMiddle();
    }


    private static IContainer NumberCell(IContainer container)
    {
        return container
            .Border(1)
            .BorderColor(Colors.Grey.Lighten1)
            .Padding(7)
            .AlignMiddle()
            .AlignRight();
    }


    private static IContainer TotalCell(IContainer container)
    {
        return container
            .Background(Colors.Grey.Lighten3)
            .Border(1)
            .BorderColor(Colors.Grey.Darken1)
            .Padding(7)
            .AlignMiddle();
    }


    private static IContainer TotalNumberCell(IContainer container)
    {
        return container
            .Background(Colors.Grey.Lighten3)
            .Border(1)
            .BorderColor(Colors.Grey.Darken1)
            .Padding(7)
            .AlignMiddle()
            .AlignRight();
    }
}
