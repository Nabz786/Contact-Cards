using System.ComponentModel.DataAnnotations;

namespace ContactListAPI.Domain.Models.Requests
{
    public class UserLoginRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
