using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly IService<DriverDto> service;
        public DriverController(IService<DriverDto> service)
        {
            this.service = service;
        }

         [HttpGet]
        public List<DriverDto> GetAll()
        {
            return service.getAll();
        }
        // GET api/<DriverController>/5
        [HttpGet("{id}")]
        public DriverDto Get(int id)
        {
            return service.get(id);
        }
       

        // POST api/<DriverController>
        [HttpPost]
        public void Post([FromBody] DriverDto value)
        {
            service.Add(value);
        }

        // PUT api/<DriverController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] DriverDto value)
        {
            service.update(id, value);
        }

        // DELETE api/<DriverController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.delete(id);
        }
    }
}
