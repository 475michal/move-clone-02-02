using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Drivers
    {
        public int Id { get; set; }
        public string Name { get; set; } //שם
        public string ContactMethod { get; set; } // יכול להכיל ערכים כמו "SMS", "Email", "Phone"
        public string Status { get; set; } //סטטוס פנוי או לא
        public string Location { get; set; } //מיקום
        public int PlacesInCar { get; set; } //מס' מקומות ברכב
        public int Rating { get; set; }   //דרוג
        public string Email { get; set; } // שדה נוסף למייל
        public string PhoneNumber { get; set; } // שדה נוסף לטלפון

    }
}
