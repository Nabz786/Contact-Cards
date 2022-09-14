namespace ContactListAPI.Domain.Models.Responses
{
    public class UserLoginResponse
    {
        public bool Success { get; set; }

        public int UserId { get; set; }

        public string Token { get; set; }

        public string ErrorMessage { get; set; }
    }
}
