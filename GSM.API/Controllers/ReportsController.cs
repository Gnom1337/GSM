using GSM.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet("daily-balance")]
        public async Task<IActionResult> DailyBalance(
            DateOnly date,
            int? tankId)
        {
            var pdf = _reportService.GenerateDailyBalance(date, tankId);

            return File(pdf,
                "application/pdf",
                $"DailyBalance_{date:yyyyMMdd}.pdf");
        }
        [HttpGet("turnover")]
        public async Task<IActionResult> Turnover(
            [FromQuery] DateOnly from,
            [FromQuery] DateOnly to,
            [FromQuery] int? productId)
        {
            var pdf = _reportService.GenerateTurnover(
                from,
                to,
                productId);

            return File(
                pdf,
                "application/pdf",
                $"Turnover_{from:yyyyMMdd}_{to:yyyyMMdd}.pdf");
        }

        /// <summary>
        /// Отчет по потерям
        /// </summary>
        [HttpGet("loss")]
        public async Task<IActionResult> Loss(
            [FromQuery] DateOnly from,
            [FromQuery] DateOnly to,
            [FromQuery] int? tankId)
        {
            var pdf = _reportService.GenerateLoss(from, to, tankId);

            return File(
                pdf,
                "application/pdf",
                $"LossReport_{from:yyyyMMdd}_{to:yyyyMMdd}.pdf");
        }
    }
}
