using ContactListAPI.Domain.Models;
using ContactListAPI.Domain.Models.Requests;
using ContactListAPI.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ContactListAPI
{
    [Route("[controller]")]
    [ApiController]
    public class UserAuthenticationController : ControllerBase
    {
        private readonly IUserAuthenticationRepository _userAuthenticationRepository;

        public UserAuthenticationController(IUserAuthenticationRepository userAuthenticationRepository)
        {
            _userAuthenticationRepository = userAuthenticationRepository;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> RegisterUser(UserRegistrationRequest userRegistrationRequest)
        {
            var userRegisterResponse = await _userAuthenticationRepository.Register(new User { Email = userRegistrationRequest.Email }, userRegistrationRequest.Password);

            return Ok(userRegisterResponse);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Login")]
        public async Task<IActionResult> Login(UserLoginRequest userLoginRequest)
        {
            var serviceResponse = await _userAuthenticationRepository.Login(userLoginRequest.Email, userLoginRequest.Password);

            if (!serviceResponse.Success)
            {
                return Unauthorized();
            }

            return Ok(serviceResponse);
        }
    }
}
