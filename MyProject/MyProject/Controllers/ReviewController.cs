using Common.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IService<ReviewDto> service;
        public ReviewController(IService<ReviewDto> service)
        {
            this.service = service;
        }

        // GET: api/<CompanyController>
        [HttpGet]
        public List<ReviewDto> GetAll()
        {
            return service.getAll();
        }

        // GET api/<CompanyController>/5
        [HttpGet("{id}")]
        public ReviewDto Get(int id)
        {
            return service.get(id);
        }

        // POST api/<CompanyController>
        [HttpPost]
        public void Post([FromBody] ReviewDto value)
        {
            service.Add(value);
        }

        // PUT api/<CompanyController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] ReviewDto value)
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
