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

        public string NameDriver{ get; set; } //שם
        public string Status { get; set; } //סטטוס פנוי או לא בסיום הנסיעה נהג מעדכן
        public float Lat { get; set; } //מיקום
        public float Lng { get; set; }
        public string Email { get; set; } // שדה נוסף למייל
        public string Password { get; set; } 
        public string PhoneNumber { get; set; } // שדה נוסף לטלפון

 
        //לנהג יש הרבה הזמנות
        public virtual ICollection<Ordering> OrderList { get; set; }

    }
}
