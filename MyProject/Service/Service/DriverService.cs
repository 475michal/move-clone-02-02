using AutoMapper;
using Common.Entity;
using Repository.Entity;
using Repository.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Service
{
    public class DriverService:IService<DriverDto>
    {
        private readonly IRepository<Drivers> repository;
        private IMapper mapper;

        public DriverService(IRepository<Drivers> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public void Add(DriverDto entity)
        {
            repository.addItem(mapper.Map<Drivers>(entity));

        }

        public void delete(int id)
        {
            repository.delete(id);

        }

        public DriverDto get(int id)
        {
            return mapper.Map<DriverDto>(repository.GetById(id));

        }

        public List<DriverDto> getAll()
        {
            return mapper.Map<List<DriverDto>>(repository.GetAll());
        }

        public void update(int id, DriverDto entity)
        {
            repository.update(id, mapper.Map<Drivers>(entity));

        }
    }
}
