using GSM.Application.Queries.TankQueries;
using GSM.Application.Queries;
using GSM.Application.Responses;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TanksController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TanksController(IMediator mediator) 
        {
            _mediator = mediator;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateTankAsync(AddTankQuerie request, CancellationToken token)
        {
          return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Tank>>> GetAllTanksAsync()
        {
            return Ok(await _mediator.Send(new GetAllTanksQuerie()));
        }
        [HttpDelete("Delete/{Id}")]
        public async Task<IActionResult> DeleteTankAsync(int Id, CancellationToken token)
        {
            BaseGetByIdQuerie<Tank> request = new BaseGetByIdQuerie<Tank> { Id = Id };
            return Ok(await _mediator.Send(request, token));
        }
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateTankAsync(UpdateTankQuerie request, CancellationToken token) 
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetById/{Id}")]
        public async Task<IActionResult> GetTankByIdAsync(int Id, CancellationToken token)
        {
            BaseGetByIdQuerie<Tank> request = new BaseGetByIdQuerie<Tank> { Id = Id };
            return Ok(await _mediator.Send(request, token));
        }
            
    }
}
