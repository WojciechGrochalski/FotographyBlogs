using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Models
{
    public class ReturnedUser
    {
        public ReturnedUser(int id, string firstName, string lastName, string username)
        {
            ID = id;
            FirstName = firstName;
            LastName = lastName;
            Username = username;
        }
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }

    }
}
