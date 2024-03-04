using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    //public enum KindCar
    //{
    //    move4,
    //    comfort4,
    //    moveXL6,
    //    black4

    //}

    public class OrderingDto
    {
       
        public int Id { get; set; }
        public int UserId { get; set; } // מפתח זר עבור המשתמש
        public int DriverId { get; set; } // מפתח זר עבור הנהג
         public string Status { get; set; }
        public KindCar ChoiseCar { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public DateTime DriveTime { get; set; }



    }
}
