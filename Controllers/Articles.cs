using Backend_Foto;
using Backend_Foto.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace foto_full.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Articles : ControllerBase
    {
        private readonly DBCTX _context;
        public Articles(DBCTX context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<IActionResult> AddArticle(Backend_Foto.Models.Article article)
        {
            _context.Article.Add(article);
            _context.SaveChanges();
            await Task.CompletedTask;
            return new OkObjectResult(true);

        }
        [HttpGet]
        public async Task<string> GetListOfArticle()
        {
            var query = _context.Article.ToList().OrderByDescending(o => o.Date);
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;
        }
        [HttpGet("one/{id}")]
        public async Task<Backend_Foto.Models.Article> GetArticleWithID(int id)
        {
            var query = _context.Article.Where(s => s.ID==id).FirstOrDefault();
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            
            
            return query;
        }
        [HttpGet("count{skip}/{first}")]
        public async Task<string> GetArticles(int skip, int first)
        {
            var query = _context.Article.Skip(skip).Take(first).ToList();
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;

        }
        [HttpGet("Featured")]
        public async Task<string> GetFeaturedArticles()
        {
            var query = _context.Article.OrderByDescending(v => v.View).Take(3);
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;

        }

        [HttpGet("user/{user}")]
        public async Task<string> GetUserArticles(int user)
        {
            var query = _context.Article.Where(s => s.AuthorID == user);
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;
        }
        [HttpGet("key/{keyword}")]
        public async Task<string> GetArticlesWithKeyword(string keyword)
        {
            var query = _context.Article.Where(s => s.Title.Contains(keyword)).ToList();
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;

        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> RemoveArtice(int id)
        {
            Backend_Foto.Models.Article article = _context.Article.FirstOrDefault(s => s.ID== id);
            _context.Article.Remove(article);
            _context.SaveChanges();
            await Task.CompletedTask;
          
            return Ok();

        }
        [HttpPost("edit")]
        public IActionResult EditPost([FromBody] Article article)
        {

            var entity = _context.Article.FirstOrDefault(s => s.ID == article.ID);
            if (entity == null)
            {
                return new BadRequestResult();
            }
            _context.Entry(entity).CurrentValues.SetValues(article);
            _context.SaveChanges();
            return new OkObjectResult(true);
        }
    }
}

