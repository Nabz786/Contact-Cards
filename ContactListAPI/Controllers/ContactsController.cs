using ContactListAPI.Domain.Models;
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
    public class ContactsController : ControllerBase
    {
        private readonly IContactsRepository _contactsRepository;

        public ContactsController(IContactsRepository contactsRepository)
        {
            _contactsRepository = contactsRepository;
        }

        [Route("GetContacts/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<IActionResult> GetContacts(int userId)
        {
            var contacts = await _contactsRepository.GetContactsAsync(userId);

            return Ok(contacts);
        }

        [Route("addContact")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
