using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend_Foto.Data;
using Backend_Foto.Tools;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace foto_full.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class File : ControllerBase
    {

        [HttpPost]

        public async Task<IActionResult> GetLastManyCurrency(List<Article> articles)
        {
            string jsonString = JsonConvert.SerializeObject(articles, Formatting.Indented);
            ApiTools.WriteToJson(ApiTools.articleJsonPath, jsonString);

            await Task.CompletedTask;
            return Ok();

        }



        [HttpGet]

        public string GetLastCurrency()
        {
            return "xd";
        }

    }
}
