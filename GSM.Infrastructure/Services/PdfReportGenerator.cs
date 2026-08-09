using GSM.Application.DTOs;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

public class PdfReportGenerator
{
    private byte[] Build(
        string title,
        Action<IContainer> content)
    {
        var document = Document.Create(doc =>
        {
            doc.Page(page =>
            {
                page.Size(PageSizes.A4);

                page.MarginTop(30);
                page.MarginBottom(30);
                page.MarginLeft(30);
                page.MarginRight(30);


                // =====================================================
                // HEADER
                // =====================================================

                page.Header()
                    .Column(header =>
                    {
                        header.Item()
                            .Row(row =>
                            {
                                // ЛОГОТИП
                                row.ConstantItem(100)
                                    .Height(55)
                                    .AlignMiddle()
                                    .Image(GetLogoPath());


                                // ЗАГОЛОВОК
                                row.RelativeItem()
                                    .AlignMiddle()
                                    .AlignCenter()
                                    .Text(title)
                                    .FontSize(20)
                                    .Bold();


                                // Чтобы заголовок был по центру страницы
                                row.ConstantItem(100);
                            });


                        header.Item()
                            .PaddingTop(10)
                            .LineHorizontal(1)
                            .LineColor(Colors.Grey.Medium);
                    });


                // =====================================================
                // CONTENT
                // =====================================================

                page.Content()
                    .PaddingTop(20)
                    .Element(content);


                // =====================================================
                // FOOTER
                // =====================================================

                page.Footer()
                    .PaddingTop(10)
                    .AlignCenter()
                    .Text(text =>
                    {
                        text.Span(
                            $"Сформировано: {DateTime.Now:dd.MM.yyyy HH:mm}"
                        )
                        .FontSize(8)
                        .FontColor(Colors.Grey.Darken1);

                        text.Span("   |   Страница ")
                            .FontSize(8)
                            .FontColor(Colors.Grey.Darken1);

                        text.CurrentPageNumber()
                            .FontSize(8);

                        text.Span(" из ")
                            .FontSize(8);

                        text.TotalPages()
                            .FontSize(8);
                    });
            });
        });


        return document.GeneratePdf();
    }


    // =============================================================
    // LOGO
    // =============================================================

    private static string GetLogoPath()
    {
        return Path.Combine(
            AppContext.BaseDirectory,
            "Services",
            "Reports",
            "Tatneft_Logo.png"
        );
    }


    // =============================================================
    // DAILY BALANCE
    // =============================================================

    public byte[] GenerateDailyBalance(
        List<DailyBalanceDto> data)
    {
        return Build(
            "Суточный баланс резервуаров",
            container =>
            {
                container.Table(table =>
                {
                    table.ColumnsDefinition(c =>
                    {
                        c.RelativeColumn(2.2f);
                        c.RelativeColumn(2.2f);
                        c.RelativeColumn(1.5f);
                        c.RelativeColumn(1.5f);
                        c.RelativeColumn(1.5f);
                    });


                    // HEADER

                    table.Header(h =>
                    {
                        h.Cell()
                            .Element(HeaderCell)
                            .Text("Резервуар");

                        h.Cell()
                            .Element(HeaderCell)
                            .Text("Продукт");

                        h.Cell()
                            .Element(HeaderCell)
                            .AlignRight()
                            .Text("Приход");

                        h.Cell()
                            .Element(HeaderCell)
                            .AlignRight()
                            .Text("Расход");

                        h.Cell()
                            .Element(HeaderCell)
                            .AlignRight()
                            .Text("Остаток");
                    });


                    // DATA

                    foreach (var x in data)
                    {
                        table.Cell()
                            .Element(DataCell)
                            .Text(x.TankNumber);

                        table.Cell()
                            .Element(DataCell)
                            .Text(x.ProductName);

                        table.Cell()
                            .Element(NumberCell)
                            .Text(
                                $"{x.TotalReceived:N0} л"
                            );

                        table.Cell()
                            .Element(NumberCell)
                            .Text(
                                $"{x.TotalDispatched:N0} л"
                            );

                        table.Cell()
                            .Element(NumberCell)
                            .Text(
                                $"{x.ClosingVolumeActual:N0} л"
                            );
                    }
                });
            });
    }


    // =============================================================
    // TURNOVER
    // =============================================================

    public byte[] GenerateTurnover(
        List<TurnoverDto> data)
    {
        return Build(
            "Оборотная ведомость",
            container =>
            {
                container.Table(table =>
                {
                    table.ColumnsDefinition(c =>
                    {
                        c.RelativeColumn(2.2f);
                        c.RelativeColumn(2.0f);
                        c.RelativeColumn(1.5f);
                        c.RelativeColumn(1.5f);
                    });


                    table.Header(h =>
                    {
                        h.Cell()
                            .Element(HeaderCell)
                            .Text("Продукт");

                        h.Cell()
                            .Element(HeaderCell)
                            .Text("Резервуар");

                        h.Cell()
                            .Element(HeaderCell)
                            .AlignRight()
                            .Text("Приход");

                        h.Cell()
                            .Element(HeaderCell)
                            .AlignRight()
                            .Text("Расход");
                    });


                    foreach (var x in data)
                    {
                        table.Cell()
                            .Element(DataCell)
                            .Text(x.ProductName);

                        table.Cell()
                            .Element(DataCell)
                            .Text(x.TankNumber);

                        table.Cell()
                            .Element(NumberCell)
                            .Text(
                                $"{x.ReceivedLiters:N0} л"
                            );

                        table.Cell()
                            .Element(NumberCell)
                            .Text(
                                $"{x.DispatchedLiters:N0} л"
                            );
                    }
                });
            });
    }


    // =============================================================
    // LOSS
    // =============================================================

    public byte[] GenerateLoss(
        List<LossDto> data)
    {
        return Build(
            "Отчет по потерям",
            container =>
            {
                container.Table(table =>
                {
                    table.ColumnsDefinition(c =>
                    {
                        c.RelativeColumn(1.5f);
                        c.RelativeColumn(2.2f);
                        c.RelativeColumn(1.5f);
                        c.RelativeColumn(1.5f);
                    });


                    table.Header(h =>
                    {
                        h.Cell()
                            .Element(HeaderCell)
                            .Text("Дата");

                        h.Cell()
                            .Element(HeaderCell)
                            .Text("Резервуар");

                        h.Cell()
                            .Element(HeaderCell)
                            .AlignRight()
                            .Text("Расчет");

                        h.Cell()
                            .Element(HeaderCell)
                            .AlignRight()
                            .Text("Потери");
                    });


                    foreach (var x in data)
                    {
                        table.Cell()
                            .Element(DataCell)
                            .Text(
                                x.Date.ToString("dd.MM.yyyy")
                            );

                        table.Cell()
                            .Element(DataCell)
                            .Text(x.TankNumber);

                        table.Cell()
                            .Element(NumberCell)
                            .Text(
                                $"{x.CalculatedVolume:N0} л"
                            );

                        table.Cell()
                            .Element(NumberCell)
                            .Text(
                                $"{x.LossLiters:N0} л"
                            );
                    }
                });
            });
    }


    // =============================================================
    // TABLE STYLES
    // =============================================================

    private static IContainer HeaderCell(
        IContainer container)
    {
        return container
            .Background(Colors.Grey.Lighten2)
            .Border(1)
            .BorderColor(Colors.Grey.Darken1)
            .PaddingVertical(7)
            .PaddingHorizontal(6)
            .AlignMiddle();
    }


    private static IContainer DataCell(
        IContainer container)
    {
        return container
            .Border(1)
            .BorderColor(Colors.Grey.Lighten1)
            .PaddingVertical(6)
            .PaddingHorizontal(6)
            .AlignMiddle();
    }


    private static IContainer NumberCell(
        IContainer container)
    {
        return container
            .Border(1)
            .BorderColor(Colors.Grey.Lighten1)
            .PaddingVertical(6)
            .PaddingHorizontal(6)
            .AlignMiddle()
            .AlignRight();
    }
}

