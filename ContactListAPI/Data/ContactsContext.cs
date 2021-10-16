using ContactListAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactListAPI.Data
{
  public class ContactsContext : DbContext
  {
    public ContactsContext(DbContextOptions<ContactsContext> dbContextOptions) : base(dbContextOptions)
    {

    }

    public DbSet<User> Users { get; set; }
    public DbSet<Contact> Contacts { get; set; }
  }
}
