using ContactListAPI.Domain.Models;
using ContactListAPI.Domain.Models.Responses;
using System.Threading.Tasks;

namespace ContactListAPI.Domain.Repositories
{
    public interface IUserActionsRepository
    {
        Task<ServiceResponse<User>> DeleteUserAsync(int userId);
    }
}
