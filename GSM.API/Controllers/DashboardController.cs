using GSM.Application.Queries.DashboardQueries;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IMediator _mediator;
        public DashboardController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("GetData")]
        public async Task<IActionResult> GetData(
     [FromQuery] GetAllDataQuerie request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
