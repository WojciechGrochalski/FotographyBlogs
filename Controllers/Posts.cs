using Backend_Foto;
using Backend_Foto.Models;
using Backend_Foto.Tools;
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
    public class Posts : ControllerBase
    {

        private readonly DBCTX _context;
        public Posts(DBCTX context)
        {
            _context = context;
        }

        [HttpPost("Post")]
        public async Task<IActionResult> AddPost(Post post)
        {
            post.CommentCount = 0;
            _context.Posts.Add(post);
            _context.SaveChanges();
            await Task.CompletedTask;
            return new OkObjectResult(true);

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
            var entity = _context.Posts.FirstOrDefault(s => s.ID == comment.Post_Id);
            if (entity == null)
            {
                return new BadRequestResult();
            }
            entity.CommentCount++;
            _context.Entry(entity).CurrentValues.SetValues(entity);
            _context.SaveChanges();
            return Ok();

        }

        [HttpGet("{id}/Comment")]
        public async Task<List<Comment>> GetComments(int id)
        {
            var query = _context.Comments.Where(com => com.Post_Id == id).OrderByDescending(i => i.Date).ToList();
            await Task.CompletedTask;
            return query;

        }
        [HttpGet("user/{user}")]
        public async Task<string> GetUserPost(int user)
        {
            var query = _context.Posts.Where(s => s.AuthorID == user).ToList();
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> RemovePost(int id)
        {
            Post post = _context.Posts.FirstOrDefault(s => s.ID == id);
            List<Comment> comments = _context.Comments.Where(d => d.Post_Id == id).ToList();
            _context.Posts.Remove(post);
            foreach (Comment item in comments)
            {
                _context.Comments.Remove(item);
            }
            _context.SaveChanges();
            await Task.CompletedTask;

            return Ok();

        }

        [HttpPost("edit")]
        public IActionResult EditPost([FromBody] Post post)
        {

            var entity = _context.Posts.FirstOrDefault(s => s.ID == post.ID);
            if (entity == null)
            {
                return new BadRequestResult();
            }
            _context.Entry(entity).CurrentValues.SetValues(post);
            _context.SaveChanges();
            return new OkObjectResult(true);
        }
    }
}
