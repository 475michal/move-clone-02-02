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
        public async Task <List<UserDto>> GetAll()
        {
            return  await service.getAll();
        }

        // GET api/<CompanyController>/5
        [HttpGet("{id}")]
        public async Task< UserDto> Get(int id)
        {
            return await service.get(id);
        }

        // POST api/<CompanyController>
        [HttpPost]
        public async Task Post([FromBody] UserDto value)
        {
          await  service.Add(value);
        }

        // PUT api/<CompanyController>/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] UserDto value)
        {
           await service.update(id, value);
        }

        // DELETE api/<CompanyController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
           await service.delete(id);
        }
    }
}
