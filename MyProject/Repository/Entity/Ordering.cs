using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Ordering
    {
        public int Id { get; set; }
        public int UserId { get; set; } // מפתח זר עבור המשתמש
        public int DriverId { get; set; } // מפתח זר עבור הנהג
        public string Status { get; set; }
        public int PlacesNeeded { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime TravelTime { get; set; }
    }
}
