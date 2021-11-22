using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactListAPI.Models
{
  public class UserRegistrationRequest
  {
    public string Username { get; set; }

    public string Password { get; set; }
  }
}
