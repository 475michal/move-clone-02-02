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
        public async Task<List<OrderingDto>> Get()
        {
            
                return await service.getAll();


           
        }

        // GET api/<CompanyController>/5
        [HttpGet("{id}")]
        public async Task<OrderingDto> Get(int id)
        {
            return await service.get(id);
        }

        // POST api/<CompanyController>
        [HttpPost]
        public async Task Post([FromBody] OrderingDto value)
        {
           await service.Add(value);
        }

        // PUT api/<CompanyController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] OrderingDto value)
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
