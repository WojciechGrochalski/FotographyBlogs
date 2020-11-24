using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Models
{
    public class User
    {

        public int ID { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username{ get; set; }
        public string Password { get; set; }


        //-- navigation property

        //public int PostID { get; set; }
        //public ICollection<Post> PostId { get; set; }

        //public List<UserHobby> userHobby { get; set; }
    }
}
