using GSM.Application.Queries;
using GSM.Application.Queries.ProductQueries;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateProductAsync(AddProductQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Product>>> GetAllProductsAsync()
        {
            return Ok(await _mediator.Send(new GetAllProductsQuerie()));
        }
        [HttpDelete("Delete/{Id}")]
        public async Task<IActionResult> DeleteProductAsync(int Id, CancellationToken token)
        {
            BaseDeleteQuerie<Product> request = new BaseDeleteQuerie<Product> { Id = Id };
            return Ok(await _mediator.Send(request, token));
        }
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateProductAsync(UpdateProductQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetById/{Id}")]
        public async Task<IActionResult> GetProductByIdAsync(int Id, CancellationToken token)
        {
            BaseGetByIdQuerie<Product> request = new BaseGetByIdQuerie<Product> { Id = Id };
            var result = await _mediator.Send(request, token);
            return Ok(result.entity);
        }
    }
}
