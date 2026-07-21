using GSM.Application.Queries;
using GSM.Application.Queries.DailyBalanceQueries;
using GSM.Application.Queries.DispatchQueries;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DispatchesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public DispatchesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateDispatchAsync(AddDispatchQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Dispatch>>> GetAllDispatchesAsync()
        {
            return Ok(await _mediator.Send(new GetAllDispatchesQuerie()));
        }
        [HttpDelete("Delete/{Id}")]
        public async Task<IActionResult> DeleteDispatchAsync(int Id, CancellationToken token)
        {
            BaseDeleteQuerie<Dispatch> request = new BaseDeleteQuerie<Dispatch> { Id = Id };
            return Ok(await _mediator.Send(request, token));
        }
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateDispatchAsync(UpdateDispatchQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetById/{Id}")]
        public async Task<IActionResult> GetDispatchByIdAsync(int Id, CancellationToken token)
        {
            BaseGetByIdQuerie<Dispatch> request = new BaseGetByIdQuerie<Dispatch> { Id = Id };
            var result = await _mediator.Send(request, token);
            return Ok(result.entity);
        }
    }
}
