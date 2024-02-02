using Repository.Entity;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ReviewRepository:IRepository<Review>
    {
        private readonly IContext _context;
        public ReviewRepository(IContext context)
        {
            _context = context;
        }

        public void addItem(Review entity)
        {
            _context.reviews.Add(entity);
            _context.save();
        }

        public void delete(int id)
        {
            _context.reviews.Remove(GetById(id));
            _context.save();
        }

        public List<Review> GetAll()
        {
            return _context.reviews.ToList();
        }

        public Review GetById(int id)
        {
            return _context.reviews.FirstOrDefault(x => x.Id == id);
        }

        public void update(int id, Review entity)
        {
            Review review = GetById(id);
            review.UserId = entity.UserId;
            review.DriverId = entity.DriverId;
            review.Comment = entity.Comment;
            review.Rating = entity.Rating;
            review.Date = entity.Date;
            review.Date = entity.Date;
            _context.save();
        }
    }
}
