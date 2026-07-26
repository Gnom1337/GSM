using GSM.Application.Queries;
using GSM.Application.Queries.DailyBalanceQueries;
using GSM.Application.Queries.TankMeasurmentQueries;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSM.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TankMeasurmentsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TankMeasurmentsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("Create/{TankId}")]
        public async Task<IActionResult> CreateTankMeasurmentAsync(int TankId, AddTankMeasurmentQuerie request, CancellationToken token)
        {
            request.TankId = TankId;
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetAll/{TankId}")]
        public async Task<ActionResult<List<TankMeasurement>>> GetAllTankMeasurmentsAsync(int TankId)
        {
            
            return Ok(await _mediator.Send(new GetAllTankMeasurmentsQuerie
            {
                TankId = TankId
            }));
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
