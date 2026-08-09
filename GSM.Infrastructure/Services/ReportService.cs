using GSM.Application.DTOs;
using GSM.Domain.Interfaces;
using GSM.Infrastructure.Data;
using GSM.Infrastructure.Services.Reports;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Infrastructure.Services
{
    public class ReportService : IReportService
    {

        private readonly ApplicationDbContext _db;
        private readonly PdfReportGenerator _pdf;



        public ReportService(
        ApplicationDbContext db,
        PdfReportGenerator pdf)
        {
            _db = db;
            _pdf = pdf;
        }





        public byte[] GenerateDailyBalance(
    DateOnly date,
    int? tankId)
        {
            var tanksQuery = _db.Tanks
                .Include(x => x.Product)
                .AsQueryable();


            if (tankId.HasValue)
            {
                tanksQuery = tanksQuery
                    .Where(x => x.TankId == tankId.Value);
            }


            var tanks = tanksQuery.ToList();

            var result = new List<DailyBalanceDto>();


            foreach (var tank in tanks)
            {
                // ==========================================
                // ОСТАТОК НА НАЧАЛО СУТОК
                // Последнее измерение до выбранной даты
                // ==========================================

                var opening = _db.TankMeasurements
                    .Where(x =>
                        x.TankId == tank.TankId &&
                        DateOnly.FromDateTime(x.MeasuredAt) < date)
                    .OrderByDescending(x => x.MeasuredAt)
                    .Select(x => (double?)x.VolumeLiters)
                    .FirstOrDefault();


                // ==========================================
                // ПРИХОД
                // ==========================================

                var received = _db.WagonReceipts
                    .Where(x =>
                        x.TankId == tank.TankId &&
                        x.ReceiptDate == date)
                    .Sum(x => (double?)x.VolumeActualLiters) ?? 0;


                // ==========================================
                // РАСХОД
                // ==========================================

                var dispatched = _db.Dispatches
                    .Where(x =>
                        x.TankId == tank.TankId &&
                        x.DispatchDate == date)
                    .Sum(x => (double?)x.VolumeInvoiceLiters) ?? 0;


                // ==========================================
                // ФАКТИЧЕСКИЙ ОСТАТОК
                // Последнее измерение за выбранные сутки
                // ==========================================

                var actual = _db.TankMeasurements
                    .Where(x =>
                        x.TankId == tank.TankId &&
                        DateOnly.FromDateTime(x.MeasuredAt) == date)
                    .OrderByDescending(x => x.MeasuredAt)
                    .Select(x => (double?)x.VolumeLiters)
                    .FirstOrDefault();


                // ==========================================
                // РАСЧЕТНЫЙ ОСТАТОК
                // ==========================================

                var calculated =
                    (opening ?? 0)
                    + received
                    - dispatched;


                // ==========================================
                // ПОТЕРИ
                // Если фактического замера нет,
                // потери НЕ рассчитываем
                // ==========================================

                var loss = actual.HasValue
                    ? calculated - actual.Value
                    : 0;


                result.Add(new DailyBalanceDto
                {
                    Date = date,

                    TankId = tank.TankId,

                    TankNumber = tank.TankNumber,

                    ProductName = tank.Product.Name,

                    OpeningVolume = opening ?? 0,

                    TotalReceived = received,

                    TotalDispatched = dispatched,

                    ClosingVolumeCalculated =
                        calculated,

                    ClosingVolumeActual =
                        actual ?? 0,

                    LossLiters =
                        loss
                });
            }


            return _pdf.GenerateDailyBalance(result);
        }






        public byte[] GenerateTurnover(
      DateOnly from,
      DateOnly to,
      int? productId)
        {

            var tanks = _db.Tanks
                .Include(x => x.Product)
                .AsQueryable();


            if (productId.HasValue)
            {
                tanks = tanks.Where(x =>
                    x.ProductId == productId.Value);
            }


            var tankList = tanks.ToList();


            var result = new List<TurnoverDto>();


            foreach (var tank in tankList)
            {

                var received =
                    _db.WagonReceipts
                    .Where(x =>
                        x.TankId == tank.TankId &&
                        x.ReceiptDate >= from &&
                        x.ReceiptDate <= to)
                    .Sum(x => (double?)x.VolumeActualLiters) ?? 0;



                var dispatched =
                    _db.Dispatches
                    .Where(x =>
                        x.TankId == tank.TankId &&
                        x.DispatchDate >= from &&
                        x.DispatchDate <= to)
                    .Sum(x => (double?)x.VolumeInvoiceLiters) ?? 0;



                result.Add(new TurnoverDto
                {
                    ProductName = tank.Product.Name,

                    TankNumber = tank.TankNumber,

                    ReceivedLiters = received,

                    DispatchedLiters = dispatched
                });

            }


            return _pdf.GenerateTurnover(result);
        }





        public byte[] GenerateLoss(
    DateOnly from,
    DateOnly to,
    int? tankId)
        {
            var tanksQuery = _db.Tanks
                .Include(x => x.Product)
                .AsQueryable();


            if (tankId.HasValue)
            {
                tanksQuery = tanksQuery
                    .Where(x => x.TankId == tankId.Value);
            }


            var tanks = tanksQuery.ToList();

            var result = new List<LossDto>();


            foreach (var tank in tanks)
            {
                var previousMeasurement = _db.TankMeasurements
                    .Where(x =>
                        x.TankId == tank.TankId &&
                        DateOnly.FromDateTime(x.MeasuredAt) < from)
                    .OrderByDescending(x => x.MeasuredAt)
                    .Select(x => (double?)x.VolumeLiters)
                    .FirstOrDefault();


                var opening = previousMeasurement ?? 0;


                for (
                    var date = from;
                    date <= to;
                    date = date.AddDays(1))
                {
                    var received = _db.WagonReceipts
                        .Where(x =>
                            x.TankId == tank.TankId &&
                            x.ReceiptDate == date)
                        .Sum(x => (double?)x.VolumeActualLiters) ?? 0;


                    var dispatched = _db.Dispatches
                        .Where(x =>
                            x.TankId == tank.TankId &&
                            x.DispatchDate == date)
                        .Sum(x => (double?)x.VolumeInvoiceLiters) ?? 0;


                    var actual = _db.TankMeasurements
                        .Where(x =>
                            x.TankId == tank.TankId &&
                            DateOnly.FromDateTime(x.MeasuredAt) == date)
                        .OrderByDescending(x => x.MeasuredAt)
                        .Select(x => (double?)x.VolumeLiters)
                        .FirstOrDefault();


                    var calculated =
                        opening +
                        received -
                        dispatched;


                    // Если замера нет,
                    // потерю определить невозможно
                    if (actual.HasValue)
                    {
                        var loss =
                            calculated -
                            actual.Value;


                        result.Add(new LossDto
                        {
                            Date = date,

                            TankNumber =
                                tank.TankNumber,

                            ProductName =
                                tank.Product.Name,

                            ActualVolume =
                                actual.Value,

                            CalculatedVolume =
                                calculated,

                            LossLiters =
                                loss
                        });


                        // Следующий день начинается
                        // с фактического остатка
                        opening = actual.Value;
                    }
                    else
                    {
                        // Если замера нет,
                        // продолжаем расчет от расчетного остатка
                        opening = calculated;
                    }
                }
            }


            return _pdf.GenerateLoss(result);
        }
    }
}
