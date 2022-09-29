using ContactListAPI.Domain.Models;
using ContactListAPI.Domain.Models.Responses;
using System.Threading.Tasks;

namespace ContactListAPI.Domain.Repositories
{
    public interface IUserAuthenticationRepository
  {
    Task<UserLoginResponse> Register(User user, string password);

    Task<UserLoginResponse> Login(string email, string password);

    Task<bool> UserExists(string email);
  }
}
