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
    public class UserAlbum : Controller
    {

        private readonly DBCTX _context;
        public UserAlbum(DBCTX context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<string> GetAlbumWithID(int id)
        {
            var query = _context.Album.Where(s => s.ID == id);
            await Task.CompletedTask;
            string result = JsonConvert.SerializeObject(query, Formatting.Indented);
            return result;
        }
   
        [HttpPost]
        public async Task<int> AddAlbum(Album album)
        {
            _context.Album.Add(album);
            _context.SaveChanges();
            await Task.CompletedTask;
            var albumfromDB = _context.Album.Max(i => i.ID);
            _context.SaveChanges();
            await Task.CompletedTask;

            return albumfromDB;
        }
        [HttpPost("addimg")]
        public async Task<IActionResult> AddAlbumImg(ImgPath img)
        {
            _context.ImgPaths.Add(img);
            _context.SaveChanges();
            await Task.CompletedTask;

            return Ok();
        }

    }
}
