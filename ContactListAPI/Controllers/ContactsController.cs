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

        [Route("GetContacts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            //Eventually we'll pass in the user id and get contacts by user, but for now we'll just return all

            var contacts = await _contactsRepository.GetContactsAsync();

            return Ok(contacts);
        }

        [Route("addContact")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPost]
        public async Task<IActionResult> AddContact(Contact contact)
        {
            var serviceResponse = await _contactsRepository.AddContactAsync(contact);

            if (serviceResponse.Success) {
                return Ok(serviceResponse);
            }

            return BadRequest(serviceResponse);
        }

        [Route("UpdateContact")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateContact(Contact contact)
        {
            var serviceResponse = await _contactsRepository.UpdateContactAsync(contact);

            if (serviceResponse.Success)
            {
                return Ok(serviceResponse);
            }

            return BadRequest(serviceResponse);
        }

        [Route("deleteContact/{contactId}")]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteContact(int contactId)
        {
            var serviceResponse = await _contactsRepository.DeleteContactAsync(contactId);

            if (serviceResponse.Success)
            {
                return Ok(serviceResponse);
            }

            return BadRequest(serviceResponse);
        }
    }
}
