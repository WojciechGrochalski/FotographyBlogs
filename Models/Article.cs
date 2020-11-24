using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Models
{


    public class Article
    {
        public int ID { get; set; }
        public string Title { get; set; }
        // public string NameAuthor { get; set; }
        public string Content { get; set; }
        public string Date { get; set; }
    
        public string[] img { get; set; }

    //public List<Grade> Grades { get; set; }
    //public List<string> Tags { get; set; }


}
}
