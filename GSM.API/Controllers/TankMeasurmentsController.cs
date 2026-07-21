using GSM.Application.Queries;
using GSM.Application.Queries.DailyBalanceQueries;
using GSM.Application.Queries.TankMeasurmentQueries;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TankMeasurmentsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TankMeasurmentsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateTankMeasurmentAsync(AddTankMeasurmentQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<TankMeasurement>>> GetAllTankMeasurmentsAsync()
        {
            return Ok(await _mediator.Send(new GetAllDailyBalancesQuerie()));
        }
        [HttpDelete("Delete/{Id}")]
        public async Task<IActionResult> DeleteTankMeasurmentAsync(int Id, CancellationToken token)
        {
            BaseDeleteQuerie<TankMeasurement> request = new BaseDeleteQuerie<TankMeasurement> { Id = Id };
            return Ok(await _mediator.Send(request, token));
        }
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateTankMeasurmentAsync(UpdateTankMeasurmentQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetById/{Id}")]
        public async Task<IActionResult> GetDailyBalanceByIdAsync(int Id, CancellationToken token)
        {
            BaseGetByIdQuerie<TankMeasurement> request = new BaseGetByIdQuerie<TankMeasurement> { Id = Id };
            var result = await _mediator.Send(request, token);
            return Ok(result.entity);
        }
    }
}
