using GSM.Application.Queries;
using GSM.Application.Queries.TankQueries;
using GSM.Application.Queries.UserQuerie;
using GSM.Application.Responses.UserResponses;
using GSM.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSM.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateUserAsync(AddUserQuerie request, CancellationToken token)
        {
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<GetAllUsersResponse>>> GetAllUsersAsync()
        {
            return Ok(await _mediator.Send(new GetAllUsersQuerie()));
        }
        [HttpDelete("Delete/{Id}")]
        public async Task<IActionResult> DeleteUserAsync(int Id, CancellationToken token)
        {
            BaseDeleteQuerie<User> request = new BaseDeleteQuerie<User> { Id = Id };
            return Ok(await _mediator.Send(request, token));
        }
        [HttpPut("Update/{Id}")]
        public async Task<IActionResult> UpdateUserAsync(int Id, UpdateUserQuerie request, CancellationToken token)
        {
            request.UserId = Id;
            return Ok(await _mediator.Send(request, token));
        }
        [HttpGet("GetById/{Id}")]
        public async Task<IActionResult> GetUserByIdAsync(int Id, CancellationToken token)
        {
            BaseGetByIdQuerie<User> request = new BaseGetByIdQuerie<User> { Id = Id };
            var result = await _mediator.Send(request, token);
            return Ok(result.entity);
        }
    }
}
