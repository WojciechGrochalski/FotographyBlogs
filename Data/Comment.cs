using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Data
{
    public class Comment
    {
        public int ID { get; set; }
        public string Author { get; set; }
        public DateTime AddDate { get; set; }
        public int Like { get; set; }
    }
}
