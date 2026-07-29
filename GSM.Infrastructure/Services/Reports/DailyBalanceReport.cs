using GSM.Domain.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

public class DailyBalanceReport : IDocument
{
    private readonly DateOnly _date;
    private readonly List<DailyBalance> _balances;

    public DailyBalanceReport(DateOnly date,
                              List<DailyBalance> balances)
    {
        _date = date;
        _balances = balances;
    }

    public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            page.Margin(30);

            page.Header()
                .Text($"Суточный баланс на {_date:dd.MM.yyyy}")
                .FontSize(20)
                .Bold();

            page.Content()
                .PaddingVertical(20)
                .Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.RelativeColumn(2);
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                    });

                    table.Header(header =>
                    {
                        header.Cell().Text("Резервуар").Bold();
                        header.Cell().Text("Начало").Bold();
                        header.Cell().Text("Приход").Bold();
                        header.Cell().Text("Расход").Bold();
                        header.Cell().Text("Факт").Bold();
                        header.Cell().Text("Потери").Bold();
                    });

                    foreach (var item in _balances)
                    {
                        table.Cell().Text(item.Tank.TankNumber);

                        table.Cell().Text(item.OpeningVolume.ToString("N2"));

                        table.Cell().Text(item.TotalReceived.ToString("N2"));

                        table.Cell().Text(item.TotalDispatched.ToString("N2"));

                        table.Cell().Text(item.ClosingVolumeActual.ToString("N2"));

                        table.Cell().Text(item.LossLiters.ToString("N2"));
                    }
                });

            page.Footer()
                .AlignCenter()
                .Text(x =>
                {
                    x.Span("Страница ");
                    x.CurrentPageNumber();
                });
        });
    }
}