using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
   public enum KindCar
    {
        move4,
        comfort4,
        moveXL6,
        black4
        
    }
    public class DriverDto
    {
        public int IdDriver { get; set; }
        public string NameUser { get; set; } //שם
        public string ContactMethod { get; set; } // יכול להכיל ערכים כמו "SMS", "Email", "Phone"
        public string Status { get; set; } //סטטוס פנוי או לא בסיום הנסיעה נהג מעדכן
        public string Location { get; set; } //מיקום
      //  public KindCar ChoiseCar { get; set; } //מס' מקומות ברכב
        //public int Rating { get; set; }   //דרוג
        public string Email { get; set; } // שדה נוסף למייל
        public string PhoneNumber { get; set; } // שדה נוסף לטלפון

    }
}
