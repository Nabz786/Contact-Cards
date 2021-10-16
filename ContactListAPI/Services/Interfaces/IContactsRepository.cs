using ContactListAPI.Models;
using System.Threading.Tasks;

namespace ContactListAPI.Services.Interfaces
{
    public interface IContactsRepository
    {
        Task<ServiceResponse<string>> AddContactAsync(Contact contact);

        Task<ServiceResponse<Contact>> GetContactsAsync();
    }
}
