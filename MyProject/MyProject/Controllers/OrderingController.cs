using Common.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
        [ApiController]
    public class OrderingController : ControllerBase
    {
        
        private readonly IService<OrderingDto> service;
        public OrderingController(IService<OrderingDto> service)
        {

            this.service=service;
        }
        // GET: api/<CompanyController>
        [HttpGet]
        public List<OrderingDto> GetAll()
        {
            return service.getAll();
        }

        // GET api/<CompanyController>/5
        [HttpGet("{id}")]
        public OrderingDto Get(int id)
        {
            return service.get(id);
        }

        // POST api/<CompanyController>
        [HttpPost]
        public void Post([FromBody] OrderingDto value)
        {
            service.Add(value);
        }

        // PUT api/<CompanyController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] OrderingDto value)
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
