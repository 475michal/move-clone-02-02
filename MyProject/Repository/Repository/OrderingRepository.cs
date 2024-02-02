using Repository.Entity;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class OrderingRepository:IRepository<Ordering>
    {
        private readonly IContext _context;
        public OrderingRepository(IContext context)
        {
            _context= context;
        }

        public void addItem(Ordering entity)
        {
            _context.orderings.Add(entity);
            _context.save();
        }

        public void delete(int id)
        {
            _context.orderings.Remove(GetById(id));
            _context.save();
        }

        public List<Ordering> GetAll()
        {
            return _context.orderings.ToList();
        }

        public Ordering GetById(int id)
        {
            return _context.orderings.FirstOrDefault(x => x.Id == id);

        }

        public void update(int id, Ordering entity)
        {
            Ordering ordering = GetById(id);
            ordering.DriverId = entity.DriverId;
            ordering.UserId = entity.UserId;
            ordering.Origin = entity.Origin;
            ordering.Status = entity.Status;
            ordering.PlacesNeeded = entity.PlacesNeeded;
            ordering.TravelTime = entity.TravelTime;
            ordering.Destination = entity.Destination;
            _context.save();
        }
    }
}
