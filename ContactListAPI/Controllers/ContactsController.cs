using ContactListAPI.Models;
using ContactListAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ContactListAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactsRepository _contactsRepository;

        public ContactsController(IContactsRepository contactsRepository)
        {
            _contactsRepository = contactsRepository;
        }

        [Route("Add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPost]
        public async Task<IActionResult> AddContact(Contact contact) {
            var serviceResponse = await _contactsRepository.AddContactAsync(contact);

            if (serviceResponse.Success) {
                return Ok(serviceResponse);
            }

            return BadRequest(serviceResponse);
        }

        [Route("GetContacts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet]
        public async Task<IActionResult> GetContacts() {
            //Eventually we'll pass in the user id and get contacts by user, but for now we'll just return all

            var serviceResponse = await _contactsRepository.GetContactsAsync();

            if (serviceResponse.Success)
            {
                return Ok(serviceResponse);
            }

            return BadRequest(serviceResponse);
        }
    }
}
