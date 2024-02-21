using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public enum KindCar
    {
        move4,
        comfort4,
        moveXL6,
        black4

    }
    public class Drivers
    {
        [Key]
        public int Id { get; set; }
       // [ForeignKey("IdDriver")]

        public string NameUser { get; set; } //שם
        public string ContactMethod { get; set; } // יכול להכיל ערכים כמו "SMS", "Email", "Phone"
        public string Status { get; set; } //סטטוס פנוי או לא בסיום הנסיעה נהג מעדכן
        public string Location { get; set; } //מיקום
       // public KindCar ChoiseCar { get; set; } //מס' מקומות ברכב
        //public int Rating { get; set; }   //דרוג
        public string Email { get; set; } // שדה נוסף למייל
        public string PhoneNumber { get; set; } // שדה נוסף לטלפון

       //לדירוג יש נהג או לנהג יש דירוג
       // public virtual ICollection<Review> ReviewList { get; set; }

        //לנהג יש הזמנות
       // public virtual Ordering Ordering { get; set; }

     
 
        //לנהג יש הרבה הזמנות
        public virtual ICollection<Ordering> OrderList { get; set; }

    }
}
