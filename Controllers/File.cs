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


namespace foto_full.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class File : ControllerBase
    {

        [HttpPost("photo")]
        public string GetFile([FromBody] UploadedImg img)
        {
            // Create unique file name
            string photoId = Guid.NewGuid().ToString();
            //string filePath = @"ClientApp\src\assets\Post\" + photoId + ".jpg";
            string filePathDetail= "Photo/" + photoId + ".jpg";
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
            return filePathDetail;
        }

    }
}
