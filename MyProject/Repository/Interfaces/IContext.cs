using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IContext
    {
        public List<Drivers> drivers { get; set; }
        public List<Users> users { get; set; }
        public List<Ordering> orderings { get; set; }
        public List<Review> reviews { get; set; }
        public void save();
    }
}
