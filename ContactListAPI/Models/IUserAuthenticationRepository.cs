using System.Threading.Tasks;

namespace ContactListAPI.Models
{
  public interface IUserAuthenticationRepository
  {
    Task<UserLoginResponse> Register(User user, string password);

    Task<UserLoginResponse> Login(string username, string password);

    Task<bool> UserExists(string username);
  }
}
