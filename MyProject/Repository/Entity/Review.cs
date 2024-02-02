using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Review
    {
        public int Id { get; set; }
        public int DriverId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public int Rating { get; set; }  //דירוג
        public string Comment { get; set; } //הערות 
    }
}
