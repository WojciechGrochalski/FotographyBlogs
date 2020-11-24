using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Models { 
    public class Interest
    {
        public int ID { get; set; }
       public string UserHobbys { get; set; }

        //-- navigation property
        public List<UserHobby> userHobby { get; set; }
    }
}
