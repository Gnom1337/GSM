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


        var document =
        Document.Create(doc =>
        {


            doc.Page(page =>
            {


                page.Size(PageSizes.A4);

                page.Margin(35);



                page.Header()
        .AlignCenter()
        .Text(title)
        .FontSize(22)
        .Bold();



                page.Content()
        .PaddingTop(20)
        .Element(content);



                page.Footer()
        .AlignCenter()
        .Text(
        $"Сформировано: {DateTime.Now:dd.MM.yyyy HH:mm}"
        );


            });


        });


        return document.GeneratePdf();

    }






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

                    c.RelativeColumn();

                    c.RelativeColumn();

                    c.RelativeColumn();

                    c.RelativeColumn();

                    c.RelativeColumn();

                });


                table.Header(h =>
                {

                    h.Cell().Text("Резервуар");
                    h.Cell().Text("Продукт");
                    h.Cell().Text("Приход");
                    h.Cell().Text("Расход");
                    h.Cell().Text("Остаток");

                });



                foreach (var x in data)
                {

                    table.Cell().Text(x.TankNumber);

                    table.Cell().Text(x.ProductName);


                    table.Cell()
            .Text($"{x.TotalReceived:N0} л");


                    table.Cell()
            .Text($"{x.TotalDispatched:N0} л");


                    table.Cell()
            .Text($"{x.ClosingVolumeCalculated:N0} л");


                }


            });


        });


    }







    public byte[] GenerateTurnover(
    List<TurnoverDto> data)
    {


        return Build(
        "Оборотная ведомость",
        container =>
        {

            container.Table(t =>
            {

                t.ColumnsDefinition(c =>
                {
                    c.RelativeColumn();
                    c.RelativeColumn();
                    c.RelativeColumn();
                    c.RelativeColumn();
                });


                t.Header(h =>
                {

                    h.Cell().Text("Продукт");

                    h.Cell().Text("Резервуар");

                    h.Cell().Text("Приход");

                    h.Cell().Text("Расход");

                });



                foreach (var x in data)
                {

                    t.Cell().Text(x.ProductName);

                    t.Cell().Text(x.TankNumber);

                    t.Cell().Text($"{x.ReceivedLiters:N0}");

                    t.Cell().Text($"{x.DispatchedLiters:N0}");

                }


            });


        });

    }




    public byte[] GenerateLoss(
    List<LossDto> data)
    {


        return Build(
        "Отчет по потерям",
        container =>
        {

            container.Table(t =>
            {


                t.ColumnsDefinition(c =>
                {

                    c.RelativeColumn();

                    c.RelativeColumn();

                    c.RelativeColumn();

                    c.RelativeColumn();

                });


                t.Header(h =>
                {

                    h.Cell().Text("Дата");

                    h.Cell().Text("Резервуар");

                    h.Cell().Text("Расчет");

                    h.Cell().Text("Потери");

                });




                foreach (var x in data)
                {

                    t.Cell().Text(x.Date.ToString());

                    t.Cell().Text(x.TankNumber);


                    t.Cell()
            .Text($"{x.CalculatedVolume:N0}");


                    t.Cell()
            .Text($"{x.LossLiters:N0}");

                }


            });


        });


    }


}
