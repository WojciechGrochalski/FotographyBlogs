using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Backend_Foto;
using Backend_Foto.Models;
using Backend_Foto.Tools;
using foto_full.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static System.Net.Mime.MediaTypeNames;

namespace foto_full.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class File : Controller
    {
        private readonly DBCTX _context;
        string lastUrl;
        public File(DBCTX context)
        {
            _context = context;
        }

        [HttpPost("Article")]
        public async Task<IActionResult> AddArticle(Article article)
        {
            _context.Article.Add(article);
            _context.SaveChanges();
            await Task.CompletedTask;
            return new OkObjectResult(true);

        }

        [HttpPost("Post")]
        public async Task<IActionResult> AddPost(Post post)
        {
            _context.Posts.Add(post);
            _context.SaveChanges();
            await Task.CompletedTask;
            return new OkObjectResult(true);

        }

        [HttpGet("Article/{skip}/{first}")]
        public async Task<string> GetArticles(int skip, int first)
        {
            var query = _context.Article.Skip(skip).Take(first).ToList();
            _context.SaveChanges();
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;

        }
        [HttpGet("Article/{keyword}")]
        public async Task<string> GetArticlesWithKeyword(string keyword)
        {
            var query = _context.Article.Where(s => s.Title.Contains(keyword)).ToList();
            _context.SaveChanges();
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;

        }
        [HttpGet("Post")]
        public async Task<string> GetPosts()
        {
            var query = _context.Posts.ToList().OrderByDescending(o => o.Date);
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;


        }
        [HttpPost("Comment")]
        public async Task<IActionResult> AddComment(Comment comment)
        {
            _context.Comments.Add(comment);
            _context.SaveChanges();
            await Task.CompletedTask;
            return Ok();

        }

        [HttpGet("{id}/Comment")]
        public async Task<List<Comment>> GetComments(int id)
        {
            var query = _context.Comments.Where(com => com.Post_Id == id).ToList();
            await Task.CompletedTask;
            return query;

        }

        [HttpGet("Article")]
        public async Task<string> GetListOfArticle()
        {
            var query = _context.Article.ToList().OrderByDescending(o => o.Date);
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;
        }


        [HttpPost("photo")]
        public async Task<IActionResult> GetFile()
        {
            var photo = Request.Form.Files[0];
            if (photo != null)
            {
                string photoId = Guid.NewGuid().ToString();
                string filePath = @"ClientApp\src\assets\Post\" + photoId + ".jpg";
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await photo.CopyToAsync(stream);
                }
                lastUrl = filePath;
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost("photoC")]
        public IActionResult GetFileC([FromBody] UploadedImg img)
        {

            // Create unique file name
            string photoId = Guid.NewGuid().ToString();
            //string filePath = @"ClientApp\src\assets\Post\" + photoId + ".jpg";
            string filePath = @"wwwroot\Photo\" + photoId + ".jpg";
            // Remove file type from base64 encoding, if any
            if (img.FileAsBase64.Contains(","))
            {
                img.FileAsBase64 = img.FileAsBase64
                  .Substring(img.FileAsBase64.IndexOf(",") + 1);
            }

            // Convert base64 encoded string to binary
            img.FileAsByteArray = Convert.FromBase64String(img.FileAsBase64);

            // Write binary file to server path
            using (var fs = new FileStream(filePath, FileMode.CreateNew))
            {
                fs.Write(img.FileAsByteArray, 0, img.FileAsByteArray.Length);
            }
            return new OkObjectResult("Photo/" + photoId + ".jpg");
        }

        [HttpGet("photo")]
        public string GetLastUrl()
        {
            return lastUrl;
        }
        [HttpPost("photoShow")]
        public async Task<IActionResult> GetFileWithShow()
        {
            var photo = Request.Form.Files[0];
            if (photo != null)
            {
                string photoId = Guid.NewGuid().ToString();
                string filePath = @"ClientApp\src\assets\Post\" + photoId + ".jpg";
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await photo.CopyToAsync(stream);


                }
                return new OkObjectResult(filePath);
            }

            return BadRequest();

        }
    }
}
