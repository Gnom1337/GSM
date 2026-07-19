using GSM.Application.Queries;
using GSM.Application.Queries.ProductQueries;
using GSM.Application.Queries.WagonReceiptQueries;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WagonReceiptsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public WagonReceiptsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateWagonReceiptAsync(AddWagonReceiptQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<WagonReceipt>>> GetAllWagonReceiptsAsync()
        {
            return Ok(await _mediator.Send(new GetAllWagonReceiptsQuerie()));
        }
        [HttpDelete("Delete/{Id}")]
        public async Task<IActionResult> DeleteWagonReceiptAsync(int Id, CancellationToken token)
        {
            BaseDeleteQuerie<WagonReceipt> request = new BaseDeleteQuerie<WagonReceipt> { Id = Id };
            return Ok(await _mediator.Send(request, token));
        }
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateWagonReceiptAsync(UpdateWagonReceiptQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetById/{Id}")]
        public async Task<IActionResult> GetWagonReceiptByIdAsync(int Id, CancellationToken token)
        {
            BaseGetByIdQuerie<WagonReceipt> request = new BaseGetByIdQuerie<WagonReceipt> { Id = Id };
            return Ok(await _mediator.Send(request, token));
        }
    }
}
