using Repository.Entity;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class DriverRepository :IRepository<Drivers>
    {
        private readonly IContext _context;
        public DriverRepository(IContext context)
        {
            _context = context;
        }

        public void addItem(Drivers entity)
        {
            _context.drivers.Add(entity);
            _context.save();
        }

        public void delete(int id)
        {
            _context.drivers.Remove(GetById(id));
            _context.save();
        }

        public List<Drivers> GetAll()
        {
            return _context.drivers.ToList();
        }

        public Drivers GetById(int id)
        {
            return _context.drivers.FirstOrDefault(x => x.Id == id);

        }

        public void update(int id, Drivers entity)
        {
            Drivers drivers = GetById(id);
            drivers.Name = entity.Name;
            drivers.Status = entity.Status;
            drivers.PlacesInCar = entity.PlacesInCar;
            drivers.ContactMethod = entity.ContactMethod;
            drivers.PhoneNumber = entity.PhoneNumber;
            drivers.Status = entity.Status;
            drivers.Email = entity.Email;
            drivers.Location = entity.Location;
            drivers.Rating = entity.Rating;
        }
    }
}
