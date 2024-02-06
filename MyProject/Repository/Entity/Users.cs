using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Users
    {
        [Key]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }

        //לדירוג יש לקוח או ללקוח יש דירוג
        public virtual Review Review { get; set; }

        //ללקוח יש הזמנות
        public virtual Ordering Ordering { get; set; }

        //ללקוח יש הרבה הזמנות
        public virtual ICollection<Ordering> OrderList { get; set; }



    }
}
