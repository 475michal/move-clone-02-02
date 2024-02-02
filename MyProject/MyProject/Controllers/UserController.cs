using Common.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IService<UserDto> service;
        public UserController(IService<UserDto> service)
        {
            this.service = service;
        }
        // GET: api/<CompanyController>
        [HttpGet]
        public List<UserDto> GetAll()
        {
            return service.getAll();
        }

        // GET api/<CompanyController>/5
        [HttpGet("{id}")]
        public UserDto Get(int id)
        {
            return service.get(id);
        }

        // POST api/<CompanyController>
        [HttpPost]
        public void Post([FromBody] UserDto value)
        {
            service.Add(value);
        }

        // PUT api/<CompanyController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] UserDto value)
        {
            service.update(id, value);
        }

        // DELETE api/<CompanyController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.delete(id);
        }
    }
}
