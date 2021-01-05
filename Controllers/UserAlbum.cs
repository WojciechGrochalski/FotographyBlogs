using Backend_Foto;
using Backend_Foto.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Backend_Foto.Tools;

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
            Album album= _context.Album.SingleOrDefault(s => s.ID == id);
            await Task.CompletedTask;
            album.ImgPaths = _context.ImgPaths.Where(i => i.Album.ID == id).ToList();
        
             string result = JsonConvert.SerializeObject(album, Formatting.Indented);
            return result;
        }

    [HttpPost]
    public async Task<int> AddAlbum(Album album, string Path)
    {
            Album newAlbum=new Album { 
                Description=album.Description,
                Title=album.Title,
                ImgPaths = new List<ImgPath>
                {
                    Pat
                }
            
            }
        _context.Album.Add(album);
        _context.SaveChanges();
        await Task.CompletedTask;
         var newAlbum=   _context.Album.Find(1);
            // var albumfromDB = _context.Album.Max(i => i.ID);
            ImgPath img = new ImgPath(Path, newAlbum.ID);
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
    [HttpGet("Remove/album/{id}")]
    public async Task<IActionResult> RemoveAlbum(int id)
    {
        Album album = _context.Album.FirstOrDefault(s => s.ID == id);
        await Task.CompletedTask;
        if (album.ImgPaths != null)
        {
            foreach (ImgPath item in album.ImgPaths)
            {
                ApiTools.RemoveImg(item.Path);
            }
        }
        _context.Album.Remove(album);
        _context.SaveChanges();
        await Task.CompletedTask;

        return Ok();
    }
    [HttpGet("Remove/album/img/{id}")]
    public async Task<IActionResult> RemoveImgFromAlbum(int id)
    {
        ImgPath imgPath = _context.ImgPaths.FirstOrDefault(s => s.ID == id);
        Album album = _context.Album.FirstOrDefault(s => s.ID == imgPath.Album.ID);
        await Task.CompletedTask;
        ApiTools.RemoveImg(imgPath.Path);
        _context.ImgPaths.Remove(imgPath);
        _context.SaveChanges();
        await Task.CompletedTask;

        return Ok();
    }

}
}
