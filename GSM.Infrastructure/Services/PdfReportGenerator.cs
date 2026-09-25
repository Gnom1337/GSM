using GSM.Application.DTOs;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System;
using System.Collections.Generic;
using System.IO;

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

                // Поля оставлены небольшими, чтобы сохранить полезную область
                // и при этом приблизиться к исходному фирменному бланку.
                page.MarginTop(25);
                page.MarginBottom(30);
                page.MarginLeft(35);
                page.MarginRight(35);

                // =====================================================
                // HEADER — ШАБЛОН БЛАНКА
                // =====================================================

                page.Header()
                    .Column(header =>
                    {
                        // =====================================================
                        // ФИРМЕННАЯ ШАПКА
                        // Русский текст — слева.
                        // Татарский текст — справа.
                        // =====================================================

                        header.Item()
                            .PaddingTop(8)
                            .Row(row =>
                            {
                                // -------------------------------------------------
                                // ЛЕВАЯ КОЛОНКА — РУССКИЙ ТЕКСТ
                                // -------------------------------------------------
                                row.RelativeItem()
                                    .AlignLeft()
                                    .Column(left =>
                                    {
                                        left.Item()
                                            .Text("ПАО «ТАТНЕФТЬ»")
                                            .FontSize(11)
                                            .Bold();

                                        left.Item()
                                            .Text("им. В.Д. Шашина")
                                            .FontSize(10)
                                            .Bold();

                                        left.Item()
                                            .PaddingTop(16)
                                            .Text("УПРАВЛЕНИЕ")
                                            .FontSize(10)
                                            .Bold();

                                        left.Item()
                                            .Text("ПО РЕАЛИЗАЦИИ")
                                            .FontSize(10)
                                            .Bold();

                                        left.Item()
                                            .Text("НЕФТИ И НЕФТЕПРОДУКТОВ")
                                            .FontSize(10)
                                            .Bold();

                                        left.Item()
                                            .PaddingTop(18)
                                            .Text("ул. Ленина, 75, г. Альметьевск,")
                                            .FontSize(8.5f);

                                        left.Item()
                                            .Text("Республика Татарстан, 423450")
                                            .FontSize(8.5f);
                                    });

                                // -------------------------------------------------
                                // ЦЕНТР — ЛОГОТИП
                                // -------------------------------------------------
                                row.ConstantItem(100)
                                    .Height(70)
                                    .AlignCenter()
                                    .AlignMiddle()
                                    .Image(GetLogoPath());

                                // -------------------------------------------------
                                // ПРАВАЯ КОЛОНКА — ТАТАРСКИЙ ТЕКСТ
                                // -------------------------------------------------
                                row.RelativeItem()
                                    .AlignRight()
                                    .Column(right =>
                                    {
                                        right.Item()
                                            .AlignRight()
                                            .Text("В.Д. Шашин исемендәге")
                                            .FontSize(10)
                                            .Bold();

                                        right.Item()
                                            .AlignRight()
                                            .Text("«ТАТНЕФТЬ» ААҖ")
                                            .FontSize(10)
                                            .Bold();

                                        right.Item()
                                            .PaddingTop(16)
                                            .AlignRight()
                                            .Text("НЕФТЬ ҺӘМ НЕФТЬ")
                                            .FontSize(10)
                                            .Bold();

                                        right.Item()
                                            .AlignRight()
                                            .Text("ПРОДУКТЛАРЫН САТУ")
                                            .FontSize(10)
                                            .Bold();

                                        right.Item()
                                            .AlignRight()
                                            .Text("ИДАРӘСЕ")
                                            .FontSize(10)
                                            .Bold();

                                        right.Item()
                                            .PaddingTop(18)
                                            .AlignRight()
                                            .Text("Ленин ур., 75, Әлмәт шәһәре,")
                                            .FontSize(8.5f);

                                        right.Item()
                                            .AlignRight()
                                            .Text("Татарстан Республикасы, 423450")
                                            .FontSize(8.5f);
                                    });
                            });

                        // Разделитель шапки
                        header.Item()
                            .PaddingTop(18)
                            .LineHorizontal(1)
                            .LineColor(Colors.Grey.Darken1);

                        // Название конкретного отчёта
                        header.Item()
                            .PaddingTop(12)
                            .PaddingBottom(4)
                            .AlignCenter()
                            .Text(title)
                            .FontSize(18)
                            .Bold();
                    });

                // =====================================================
                // CONTENT
                // =====================================================

                page.Content()
                    .PaddingTop(12)
                    .Element(content);

                // =====================================================
                // FOOTER
                // =====================================================

                page.Footer()
                    .PaddingTop(8)
                    .AlignCenter()
                    .Text(text =>
                    {
                        text.Span($"Сформировано: {DateTime.Now:dd.MM.yyyy HH:mm}")
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

                    table.Header(h =>
                    {
                        h.Cell().Element(HeaderCell).Text("Резервуар");
                        h.Cell().Element(HeaderCell).Text("Продукт");

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
                            .Text($"{x.TotalReceived:N0} л");

                        table.Cell()
                            .Element(NumberCell)
                            .Text($"{x.TotalDispatched:N0} л");

                        table.Cell()
                            .Element(NumberCell)
                            .Text($"{x.ClosingVolumeActual:N0} л");
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
                        h.Cell().Element(HeaderCell).Text("Продукт");
                        h.Cell().Element(HeaderCell).Text("Резервуар");

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
                            .Text($"{x.ReceivedLiters:N0} л");

                        table.Cell()
                            .Element(NumberCell)
                            .Text($"{x.DispatchedLiters:N0} л");
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
                        h.Cell().Element(HeaderCell).Text("Дата");
                        h.Cell().Element(HeaderCell).Text("Резервуар");

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
                            .Text(x.Date.ToString("dd.MM.yyyy"));

                        table.Cell()
                            .Element(DataCell)
                            .Text(x.TankNumber);

                        table.Cell()
                            .Element(NumberCell)
                            .Text($"{x.CalculatedVolume:N0} л");

                        table.Cell()
                            .Element(NumberCell)
                            .Text($"{x.LossLiters:N0} л");
                    }
                });
            });
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
    // TABLE STYLES
    // =============================================================

    private static IContainer HeaderCell(IContainer container)
    {
        return container
            .Background(Colors.Grey.Lighten2)
            .Border(1)
            .BorderColor(Colors.Grey.Darken1)
            .PaddingVertical(7)
            .PaddingHorizontal(6)
            .AlignMiddle();
    }

    private static IContainer DataCell(IContainer container)
    {
        return container
            .Border(1)
            .BorderColor(Colors.Grey.Lighten1)
            .PaddingVertical(6)
            .PaddingHorizontal(6)
            .AlignMiddle();
    }

    private static IContainer NumberCell(IContainer container)
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