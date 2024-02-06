using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Review
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        [ForeignKey("OrderId")]

        public int UserId { get; set; }
        [ForeignKey("UserId")]

        public DateTime Date { get; set; }
        public int Rating { get; set; }  //דירוג
        public string Comment { get; set; } //הערות 


    }
}
