using Backend_Foto.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_Foto.Tools
{
    public class ApiTools
    {
        public static string articleJsonPath = @"jsonfile/article.json";

        public static void WriteToJson(string path, string data)
        {
            List<Article> listArticle = new List<Article>();
            string content;
            content = File.ReadAllText(path);

            if (content == "")
            {
                File.WriteAllText(path, data);
            }
            else
            {
                listArticle.AddRange(JsonConvert.DeserializeObject<List<Article>>(content));
                listArticle.AddRange(JsonConvert.DeserializeObject<List<Article>>(data));
                string jsonString = JsonConvert.SerializeObject(listArticle, Formatting.Indented);
                File.WriteAllText(path, jsonString);
            }



        }
    }
}
