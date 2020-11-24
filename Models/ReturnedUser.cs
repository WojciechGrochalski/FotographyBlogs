using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Models
{
    public class ReturnedUser
    {
        public ReturnedUser(string firstName, string lastName, string username)
        {
            FirstName = firstName;
            LastName = lastName;
            Username = username;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }

    }
}
