using Repository.Entity;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class UserRepository:IRepository<Users>
    {
        private readonly IContext _context;
        public UserRepository(IContext context)
        {
            _context = context;
        }

        public void addItem(Users entity)
        {
            _context.users.Add(entity);
            _context.save();
        }

        public void delete(int id)
        {
            _context.users.Remove(GetById(id));
            _context.save();
        }

        public List<Users> GetAll()
        {
            return _context.users;
        }

        public Users GetById(int id)
        {
            return _context.users.FirstOrDefault(x => x.Id == id);

        }

        public void update(int id, Users entity)
        {
            Users users = GetById(id);
            users.Username = entity.Username;
            users.Password = entity.Password;
            users.Email = entity.Email;
            users.AuthenticationType = entity.AuthenticationType;
            users.PhoneNumber = entity.PhoneNumber;

        }
    }
}
