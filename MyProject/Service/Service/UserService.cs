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
    public class UserService : IService<UserDto>
    {
        private readonly IRepository<Users> repository;

        private IMapper mapper;
        public UserService(IRepository<Users> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public void Add(UserDto entity)
        {
            repository.addItem(mapper.Map<Users>(entity));
        }

        public void delete(int id)
        {
            repository.delete(id);

        }

        public UserDto get(int id)
        {
            return mapper.Map<UserDto>(repository.GetById(id));
        }

        public List<UserDto> getAll()
        {
            return mapper.Map<List<UserDto>>(repository.GetAll());

        }

        public void update(int id, UserDto entity)
        {
            repository.update(id, mapper.Map<Users>(entity));
        }
    }
}
