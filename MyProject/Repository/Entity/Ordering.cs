using Common.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Ordering
    {
        [Key]
        public int OrderId { get; set; }
        public int UserId { get; set; } // מפתח זר עבור המשתמש
        [ForeignKey("UserId")]
        public virtual Users User { get; set; }

        public int DriverId { get; set; } // מפתח זר עבור הנהג
        [ForeignKey("DriverId")]
        public virtual Drivers Drivers { get; set; }

        public string Status { get; set; }
        public KindCar ChoiseCar { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public DateTime DriveTime { get; set; }


        //להזמנה יש תשלום
        public virtual Paypal Paypal { get; set; }

        //להזמנה יש דירוג
        //public virtual Review Review { get; set; }

        //להזמנה יש הרבה דירוגים
        public virtual ICollection<Review> ReviewList { get; set; }


    }
}
