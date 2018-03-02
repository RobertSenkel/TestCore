using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRUD_Core.Models;

namespace CRUD_Core.Controllers
{
   // [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        UserContext db;

        public UsersController(UserContext context)
        {
            db = context;
            if (!db.Users.Any())
            {
                db.Users.Add(new User { Email = "robert.senkel", Password = "123" });
           
                db.SaveChanges();
            }
        }

        [HttpPost("{all}")]

        public IEnumerable<User> FetchAllUsers([FromBody]User user)
        {
            var u = db.Users.FirstOrDefault(x=>x.Email==user.Email && x.Password==user.Password);
            if (u != null)
                return db.Users.ToList();
            else throw new Exception("This user doesnt exist");
        }

        [HttpGet("{id}")]
        public User Get(int id)
        {
            User user = db.Users.FirstOrDefault(x => x.Id == id);
            return user;
        }

        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                db.SaveChanges();
                return Ok(user);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]User user)
        {
            if (ModelState.IsValid)
            {
                db.Update(user);
                db.SaveChanges();
                return Ok(user);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            User user = db.Users.FirstOrDefault(x => x.Id == id);
            if (user != null)
            {
                db.Users.Remove(user);
                db.SaveChanges();
            }
            return Ok(user);
        }
    }
}