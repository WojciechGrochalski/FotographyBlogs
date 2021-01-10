using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Models
{
    public class Post
    {

        public int ID { get; set; }
        public string Title { get; set; }
        public string Content{ get; set; }
        public string Date { get; set; }
        public string Author { get; set; }
        public int  CommentCount { get; set; }
        public int AuthorID { get; set; }

    }
}
