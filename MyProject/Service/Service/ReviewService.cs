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
    public class ReviewService:IService<ReviewDto>
    {
        private readonly IRepository<Review> repository;
        private IMapper mapper;
        public ReviewService(IRepository<Review> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public void Add(ReviewDto entity)
        {
            repository.addItem(mapper.Map<Review>(entity));

        }

        public void delete(int id)
        {
            repository.delete(id);
        }

        public ReviewDto get(int id)
        {
            return mapper.Map<ReviewDto>(repository.GetById(id));
        }

        public List<ReviewDto> getAll()
        {
            return mapper.Map<List<ReviewDto>>(repository.GetAll());

        }

        public void update(int id, ReviewDto entity)
        {
            repository.update(id, mapper.Map<Review>(entity));

        }
    }
}
