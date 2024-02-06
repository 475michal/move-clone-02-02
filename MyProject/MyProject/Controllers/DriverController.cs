using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<List<DriverDto>> GetAll()
        {
            return await service.getAll();
        }
        // GET api/<DriverController>/5
        [HttpGet("{id}")]
        public async Task<DriverDto> Get(int id)
        {
            return await service.get(id);
        }
       

        // POST api/<DriverController>
        [HttpPost]
        public async Task Post([FromBody] DriverDto value)
        {
          await service.Add(value);
        }

        // PUT api/<DriverController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] DriverDto value)
        {
           await service.update(id, value);
        }

        // DELETE api/<DriverController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.delete(id);
        }
    }
}
