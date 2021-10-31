using ContactListAPI.Data;
using ContactListAPI.Models;
using ContactListAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        public async Task<IEnumerable<Contact>> GetContactsAsync()
        {
            var contacts = await _contactsContext.Contacts.AsNoTracking().ToListAsync();

            return contacts;
        }

        public async Task<ServiceResponse<Contact>> AddContactAsync(Contact contact)
        {
            var serviceResponse = new ServiceResponse<Contact>();

            if (await DoesContactExist(contact.FirstName, contact.LastName))
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Contact Already Exists";

                return serviceResponse;
            }

            try
            {
                var addedContact = await _contactsContext.AddAsync(contact);
                await _contactsContext.SaveChangesAsync();

                serviceResponse.ReturnResource = addedContact.Entity;

                return serviceResponse;
            }
            catch (Exception ex)
            {
                serviceResponse.Message = $"An error occurred while trying to add contact {ex.Message}";

                return serviceResponse;
            }
        }

        public async Task<ServiceResponse<Contact>> DeleteContactAsync(int contactId)
        {
            var serviceResponse = new ServiceResponse<Contact>();

            var contactToRemove = await _contactsContext.Contacts.FindAsync(contactId);

            if (contactToRemove == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Contact Does Not Exist";

                return serviceResponse;
            }

            try
            {
                _contactsContext.Contacts.Remove(contactToRemove);

                await _contactsContext.SaveChangesAsync();

                serviceResponse.ReturnResource = contactToRemove;

                return serviceResponse;
            }
            catch (Exception ex)
            {
                serviceResponse.Message = $"An error occurred while trying to delete the resource {ex.Message}";

                return serviceResponse;
            }
        }

        public async Task<ServiceResponse<Contact>> UpdateContactAsync(Contact updatedContact)
        {
            var serviceResponse = new ServiceResponse<Contact>();

            var contactToUpdate = await _contactsContext.Contacts.FindAsync(updatedContact.Id);

            if (contactToUpdate == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Contact Does Not Exist";

                return serviceResponse;
            }

            contactToUpdate.FirstName = updatedContact.FirstName;
            contactToUpdate.LastName = updatedContact.LastName;

            try
            {
                _contactsContext.Contacts.Update(contactToUpdate);

                await _contactsContext.SaveChangesAsync();

                serviceResponse.ReturnResource = contactToUpdate;

                return serviceResponse;
            }
            catch (Exception ex)
            {
                serviceResponse.Message = $"An Error occurred while trying to update resource {ex.Message}";

                return serviceResponse;
            }
        }

        private async Task<bool> DoesContactExist(string firstName, string lastName)
        {
            return await _contactsContext.Contacts
                .AnyAsync(contact => contact.FirstName.ToLower().Equals(firstName) && contact.LastName.ToLower().Equals(lastName));
        }
    }
}
