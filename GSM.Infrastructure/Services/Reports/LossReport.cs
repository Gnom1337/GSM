using GSM.Domain.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Services.Reports
{
    public class LossReport : IDocument
    {
        private readonly DateOnly _from;
        private readonly DateOnly _to;
        private readonly List<DailyBalance> _balances;

        public LossReport(
            DateOnly from,
            DateOnly to,
            List<DailyBalance> balances)
        {
            _from = from;
            _to = to;
            _balances = balances
                .Where(x => x.LossLiters != 0)
                .OrderBy(x => x.BalanceDate)
                .ToList();
        }

        public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

        public void Compose(IDocumentContainer container)
        {
            container.Page(page =>
            {
                page.Margin(25);

                page.Header()
                    .Text($"Отчет по потерям\n{_from:dd.MM.yyyy} - {_to:dd.MM.yyyy}")
                    .FontSize(20)
                    .Bold();

                page.Content().Table(table =>
                {
                    table.ColumnsDefinition(c =>
                    {
                        c.RelativeColumn();
                        c.RelativeColumn(2);
                        c.RelativeColumn();
                        c.RelativeColumn();
                        c.RelativeColumn();
                    });

                    table.Header(header =>
                    {
                        header.Cell().Text("Дата").Bold();
                        header.Cell().Text("Резервуар").Bold();
                        header.Cell().Text("Расчетный остаток").Bold();
                        header.Cell().Text("Фактический остаток").Bold();
                        header.Cell().Text("Потери").Bold();
                    });

                    foreach (var item in _balances)
                    {
                        table.Cell().Text(item.BalanceDate.ToString("dd.MM.yyyy"));
                        table.Cell().Text(item.Tank.TankNumber);

                        table.Cell()
                            .AlignRight()
                            .Text(item.ClosingVolumeCalculated.ToString("N2"));

                        table.Cell()
                            .AlignRight()
                            .Text(item.ClosingVolumeActual.ToString("N2"));

                        table.Cell()
                            .AlignRight()
                            .Text(item.LossLiters.ToString("N2"))
                            .FontColor(item.LossLiters > 0
                                ? Colors.Red.Medium
                                : Colors.Green.Medium);
                    }

                    table.Cell().ColumnSpan(4).Text("Общие потери").Bold();

                    table.Cell()
                        .AlignRight()
                        .Text(_balances.Sum(x => x.LossLiters).ToString("N2"))
                        .Bold();
                });
            });
        }
    }
}
