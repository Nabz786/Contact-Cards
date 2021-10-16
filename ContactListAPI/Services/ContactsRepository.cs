using ContactListAPI.Data;
using ContactListAPI.Models;
using ContactListAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ContactListAPI.Services
{
    public class ContactsRepository : IContactsRepository
    {
        private readonly ContactsContext _contactsContext;

        public ContactsRepository(ContactsContext contactsContext)
        {
            _contactsContext = contactsContext;
        }

        public async Task<ServiceResponse<string>> AddContactAsync(Contact contact)
        {
            var serviceResponse = new ServiceResponse<string>();

            if (await DoesContactExist(contact.FirstName, contact.LastName)) {
                serviceResponse.Success = false;
                serviceResponse.Error = "Contact Already Exists";

                return serviceResponse;
            }

            await _contactsContext.AddAsync(contact);
            await _contactsContext.SaveChangesAsync();

            serviceResponse.Success = true;
            return serviceResponse;
        }

        public async Task<ServiceResponse<Contact>> GetContactsAsync() {
            var serviceResponse = new ServiceResponse<Contact>();

            var contacts = await _contactsContext.Contacts.ToListAsync();

            serviceResponse.ReturnPayload = contacts;
            serviceResponse.Success = true;

            return serviceResponse;
        }

        private async Task<bool> DoesContactExist(string firstName, string lastName)
        {
            return await _contactsContext.Contacts
                .AnyAsync(contact => contact.FirstName.ToLower().Equals(firstName) && contact.LastName.ToLower().Equals(lastName));
        }
    }
}
