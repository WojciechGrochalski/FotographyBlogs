using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend_Foto;
using Backend_Foto.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace foto_full.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class login : ControllerBase
    {
        private readonly DBCTX _context;
        public login(DBCTX context)
        {
            _context = context;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            var query = _context.Users.FirstOrDefault(login => login.Username == user.Username);
            await Task.CompletedTask;
            if (query != null)
            {
                if (user.Username == query.Username)
                {
                    return new OkObjectResult(false);

                }
            }
            _context.Users.Add(user);
            _context.SaveChanges();

            return new OkObjectResult(true);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(User user)
        {
            var query = _context.Users.FirstOrDefault(login => login.Username == user.Username && login.Password == user.Password);
            await Task.CompletedTask;
            if(query!=null)
            if ((user.Username == query.Username
                    && user.Password==query.Password))
            {
                ReturnedUser returnedUser = new ReturnedUser(user.FirstName, user.LastName, user.Username);
                return new OkObjectResult(returnedUser);

            }
            return  new OkObjectResult(false);


        }
    }
}
