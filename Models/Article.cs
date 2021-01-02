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
        public string Author { get; set; }
        public string Content { get; set; }
        public string Date { get; set; }
        public string Img { get; set; }
        public int? View { get; set; }

        //public Article(int id, string title, string author, string content, string date, string img, int view)
        //{
        //    ID = id;
        //    Title = title;
        //    Author = author;
        //    Content = content;
        //    Date = date;
        //    Img = img;
        //    View = view;

        //}

        //public Article(int iD, string title, string author, string content, string date, string img, int? view)
        //{
        //    ID = iD;
        //    Title = title;
        //    Author = author;
        //    Content = content;
        //    Date = date;
        //    Img = img;
        //    View = view;
        //}
    }
}
