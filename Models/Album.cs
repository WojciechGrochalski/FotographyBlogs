using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Models
{
    public class Album
    {
       
        public int ID { get; set; }
        public string Title { get; set; }
        public List<ImgPath> ImgPaths { get; set; }
        public string Description { get; set; }
        public int UserModelID { get; set; }
      
       
    }
}
