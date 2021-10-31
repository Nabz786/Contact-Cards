using ContactListAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactListAPI.Services.Interfaces
{
    public interface IContactsRepository
    {
        Task<ServiceResponse<Contact>> AddContactAsync(Contact contact);

        Task<IEnumerable<Contact>> GetContactsAsync();

        Task<ServiceResponse<Contact>> DeleteContactAsync(int contactId);

        Task<ServiceResponse<Contact>> UpdateContactAsync(Contact updatedContact);
    }
}
