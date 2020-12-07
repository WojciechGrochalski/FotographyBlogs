using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Models
{
    public class Comment
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public string Date { get; set; }
        public int Post_Id { get; set; }
    }
}
