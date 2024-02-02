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
    namespace Service.Service
    {
        public class OrderingService : IService<OrderingDto>
        {
            private readonly IRepository<Ordering> repository;
            private IMapper mapper;

            public OrderingService(IRepository<Ordering> repository, IMapper mapper)
            {
                this.repository = repository;
                this.mapper = mapper;
            }

            public void Add(OrderingDto entity)
            {
                repository.addItem(mapper.Map<Ordering>(entity));
            }

           

            public void delete(int id)
            {
                repository.delete(id);
            }

            public OrderingDto get(int id)
            {
                return mapper.Map<OrderingDto>(repository.GetById(id));

            }



            public List<OrderingDto> getAll()
            {
                return mapper.Map<List<OrderingDto>>(repository.GetAll());

            }

          

            public void update(int id, OrderingDto entity)
            {
                repository.update(id, mapper.Map<Ordering>(entity));
            }
        }
    }

}
