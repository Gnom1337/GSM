using GSM.Domain.Models;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Services.Reports
{
    public class TurnoverReport : IDocument
    {
        private readonly DateOnly _from;
        private readonly DateOnly _to;
        private readonly List<DailyBalance> _balances;

        public TurnoverReport(
            DateOnly from,
            DateOnly to,
            List<DailyBalance> balances)
        {
            _from = from;
            _to = to;
            _balances = balances;
        }

        public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

        public void Compose(IDocumentContainer container)
        {
            container.Page(page =>
            {
                page.Margin(25);

                page.Header()
                    .Text($"Оборотная ведомость\n{_from:dd.MM.yyyy} - {_to:dd.MM.yyyy}")
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
                        c.RelativeColumn();
                        c.RelativeColumn();
                    });

                    table.Header(header =>
                    {
                        header.Cell().Text("Дата").Bold();
                        header.Cell().Text("Резервуар").Bold();
                        header.Cell().Text("Начало").Bold();
                        header.Cell().Text("Приход").Bold();
                        header.Cell().Text("Расход").Bold();
                        header.Cell().Text("Расчет").Bold();
                        header.Cell().Text("Факт").Bold();
                    });

                    foreach (var item in _balances
                        .OrderBy(x => x.BalanceDate)
                        .ThenBy(x => x.Tank.TankNumber))
                    {
                        table.Cell().Text(item.BalanceDate.ToString("dd.MM.yyyy"));
                        table.Cell().Text(item.Tank.TankNumber);
                        table.Cell().AlignRight().Text(item.OpeningVolume.ToString("N2"));
                        table.Cell().AlignRight().Text(item.TotalReceived.ToString("N2"));
                        table.Cell().AlignRight().Text(item.TotalDispatched.ToString("N2"));
                        table.Cell().AlignRight().Text(item.ClosingVolumeCalculated.ToString("N2"));
                        table.Cell().AlignRight().Text(item.ClosingVolumeActual.ToString("N2"));
                    }

                    table.Cell().ColumnSpan(2).Text("Итого").Bold();

                    table.Cell().AlignRight().Text(_balances.Sum(x => x.OpeningVolume).ToString("N2")).Bold();
                    table.Cell().AlignRight().Text(_balances.Sum(x => x.TotalReceived).ToString("N2")).Bold();
                    table.Cell().AlignRight().Text(_balances.Sum(x => x.TotalDispatched).ToString("N2")).Bold();
                    table.Cell().AlignRight().Text(_balances.Sum(x => x.ClosingVolumeCalculated).ToString("N2")).Bold();
                    table.Cell().AlignRight().Text(_balances.Sum(x => x.ClosingVolumeActual).ToString("N2")).Bold();
                });
            });
        }
    }
}
