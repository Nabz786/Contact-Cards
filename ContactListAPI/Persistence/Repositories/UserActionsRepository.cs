using ContactListAPI.Domain.Models;
using ContactListAPI.Domain.Models.Responses;
using ContactListAPI.Domain.Repositories;
using ContactListAPI.Persistence.Contexts;
using System;
using System.Threading.Tasks;

namespace ContactListAPI.Persistence.Repositories
{
    public class UserActionsRepository : IUserActionsRepository
    {
        private ContactsContext _context;
        private IContactsRepository _contactsRepository;
   
        public UserActionsRepository(ContactsContext contactsContext, IContactsRepository contactsRepository)
        {
            _context = contactsContext;
            _contactsRepository = contactsRepository;
        }

        public async Task<ServiceResponse<User>> DeleteUserAsync(int userId)
        {
            var userDeletedResponse = new ServiceResponse<User>();

            var userToDelete = await _context.Users.FindAsync(userId);

            try
            {
                _contactsRepository.BulkDeleteContactsByUserId(userToDelete.Id);
                _context.Users.Remove(userToDelete);

                await _context.SaveChangesAsync();

                userDeletedResponse.ReturnResource = userToDelete;
                userDeletedResponse.Success = true;

                return userDeletedResponse;
            }
            catch (Exception ex)
            {
                userDeletedResponse.Message = $"An error occurred while trying to delete the resource {ex.Message}";

                return userDeletedResponse;
            }
         }
    }
}
