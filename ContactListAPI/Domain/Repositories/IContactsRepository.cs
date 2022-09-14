using ContactListAPI.Domain.Models;
using ContactListAPI.Domain.Models.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactListAPI.Domain.Repositories
{
    public interface IContactsRepository
    {
        Task<ServiceResponse<Contact>> AddContactAsync(Contact contact);

        Task<IEnumerable<Contact>> GetContactsAsync(int userId);

        Task<ServiceResponse<Contact>> DeleteContactAsync(int contactId);

        Task<ServiceResponse<Contact>> UpdateContactAsync(Contact updatedContact);

        void BulkDeleteContactsByUserId(int userId);
    }
}
