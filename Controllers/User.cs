using Backend_Foto;
using Backend_Foto.Models;
using Backend_Foto.Tools;
using foto_full.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace foto_full.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User : ControllerBase
    {
        private readonly DBCTX _context;
        public User(DBCTX context)
        {
            _context = context;
        }
        [HttpPost("photo/{id}")]
        public IActionResult GetFile([FromBody] UploadedImg img, int id)
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
            var entity = _context.Album.FirstOrDefault(s => s.ID == id);
            if (entity == null)
            {
                return new BadRequestResult();
            }
            ImgPath path = new ImgPath();
            path.Path = filePath;
            entity.ImgPaths.Add(path);
            _context.Entry(entity).CurrentValues.SetValues(entity);
            _context.SaveChanges();
            return new OkObjectResult("Photo/" + photoId + ".jpg");
        }

        [HttpGet("album/{user}")]
        public async Task<string> GetAlbumForUser(int user)
        {
            List<Album> query = _context.Album.Where(i =>i.UserModelID==user).ToList();
            foreach (Album item in query)
            {
                item.ImgPaths = _context.ImgPaths.Where(i => i.AlbumID == item.ID).ToList();
            }
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;
        }
        [HttpGet("album/img/{id}")]
        public async Task<string> GetAlbumImg(int id)
        {
            var query = _context.ImgPaths.Where(i => i.AlbumID == id).ToList();
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;
        }
        [HttpPost("update/{id}")]
        public IActionResult UpdateUser([FromBody] UserModel user, int id)
        {

            var entity = _context.Users.FirstOrDefault(s => s.ID == id);
            if (entity == null)
            {
                return new BadRequestResult();
            }
            ApiTools.RemoveImg(user.Username);
            user.Password = entity.Password;
            user.ID = entity.ID;
            user.Posts = entity.Posts;
            user.Albums = entity.Albums;
            _context.Entry(entity).CurrentValues.SetValues(user);
            _context.SaveChanges();
            user.Password = null;
            
            return new OkObjectResult(user);
        }
    }
}
