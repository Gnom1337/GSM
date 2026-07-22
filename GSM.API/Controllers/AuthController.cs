using GSM.Application.Queries.UserQuerie;
using GSM.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace GSM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _service;
        public AuthController(AuthService service)
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
            return Ok(JsonSerializer.Serialize("Авторизация прошла успешно"));
        }
    }
}
