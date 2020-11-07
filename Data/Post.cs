using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Data
{
    public class Post
    {

        public int ID { get; set; }
        public DateTime Data { get; set; }
  
        //-- navigation property
        
        public int UserId { get; set; }
        public User DisplayName { get; set; }
    }
}
