using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Data
{
    public class UserHobby
    {

        public int ID {get;set;}
        public int UserID { get; set; }
        public int HobbyID { get; set; }

        //-- navigation property

        public User User { get; set; }
        public Interest Interest { get; set; }

    }
}
