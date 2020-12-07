
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;
using Backend_Foto.Models;



namespace Backend_Foto
{
    public class DBCTX :DbContext
    {
        public DBCTX()
        {
        }
        public DBCTX(DbContextOptions<DBCTX> options)
             : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<UserHobby> UserHobbies { get; set; }



    }
}

