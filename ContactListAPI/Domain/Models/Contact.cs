namespace ContactListAPI.Domain.Models
{
    public class Contact
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EmailAddress { get; set; }

        public string StreetAddress { get; set; }

        public string Occupation { get; set; }
    }
}
