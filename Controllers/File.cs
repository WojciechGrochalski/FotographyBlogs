using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Backend_Foto.Models;
using Backend_Foto.Tools;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static System.Net.Mime.MediaTypeNames;

namespace foto_full.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class File : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> PostArticle(List<Article> articles)
        {
            string jsonString = JsonConvert.SerializeObject(articles, Formatting.Indented);
            ApiTools.WriteToJson(ApiTools.articleJsonPath, jsonString);

            await Task.CompletedTask;
            return Ok();

        }

        [HttpGet("Article")]
        public string GetListOfArticle()
        {
            return ApiTools.GetArticle();
        }
        [HttpPost("photo")]
        public async Task<IActionResult> GetFile()
        {
            var photo = Request.Form.Files[0];
            if (photo != null)
            {
                string photoId = Guid.NewGuid().ToString();
                string filePath= @"wwwroot/Photo/"+photoId+".jpg";
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await photo.CopyToAsync(stream);


                }
                return Ok();
            }

            return BadRequest();

        }
    }
}
