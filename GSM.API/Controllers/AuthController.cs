using GSM.Application.Queries.UserQuerie;
using GSM.Application.Services;
using GSM.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace GSM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginQuerie request)
        {
            var result = await _service.Login(request.UserName, request.Password);
            if (result.Equals("Не верный логин или пароль"))
            {
                return BadRequest(JsonSerializer.Serialize(result));
            }

            Response.Cookies.Append("GSM-cookies", result, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
            });
            return Ok(new
            {
                message = "Авторизация прошла успешно"
            });
        }
        [Authorize]
        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("GSM-cookies");

            return Ok();
        }
        [Authorize]
        [HttpGet("Me")]
        public IActionResult Me()
        {
            return Ok(new
            {
                Id = User.FindFirstValue(ClaimTypes.NameIdentifier),
                FullName = User.FindFirstValue(ClaimTypes.Name),
                Role = User.FindFirstValue(ClaimTypes.Role)
            });
        }
    }
}
