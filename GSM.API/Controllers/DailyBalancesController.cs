using GSM.Application.Queries;
using GSM.Application.Queries.DailyBalanceQueries;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GSM.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DailyBalancesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public DailyBalancesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateDailyBalanceAsync(AddDailyBalanceQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<DailyBalance>>> GetAllDailyBalancesAsync()
        {
            return Ok(await _mediator.Send(new GetAllDailyBalancesQuerie()));
        }
        [HttpDelete("Delete/{Id}")]
        public async Task<IActionResult> DeleteDailyBalanceAsync(int Id, CancellationToken token)
        {
            BaseDeleteQuerie<DailyBalance> request = new BaseDeleteQuerie<DailyBalance> { Id = Id };
            return Ok(await _mediator.Send(request, token));
        }
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateDailyBalanceAsync(UpdateDailyBalanceQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetById/{Id}")]
        public async Task<IActionResult> GetDailyBalanceByIdAsync(int Id, CancellationToken token)
        {
            BaseGetByIdQuerie<DailyBalance> request = new BaseGetByIdQuerie<DailyBalance> { Id = Id };
            var result = await _mediator.Send(request, token);
            return Ok(result.entity);
        }
    }
}
