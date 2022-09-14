using ContactListAPI.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ContactListAPI.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class UserActionsController : ControllerBase
    {
        private IUserActionsRepository _userActionsRepository;

        public UserActionsController(IUserActionsRepository userActionsRepository)
        {
            _userActionsRepository = userActionsRepository;
        }

        [HttpDelete]
        [Route("deleteUser/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var userDeletedResponse = await _userActionsRepository.DeleteUserAsync(userId);

            if (userDeletedResponse.Success)
            {
                return Ok(userDeletedResponse);
            }

            return BadRequest(userDeletedResponse);
        }
    }
}
