using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Paypal
    {
        [Key]
        public int PaypalId { get; set; }

        public int OrderId { get; set; }
        [ForeignKey("OrderId")]   

        public int NumberCard { get; set; }
        public DateTime Validity { get; set; }
        public int Cvc { get; set; }
        public int Price { get; set; }
        public int IdentityCard { get; set; }//ת.ז.

        
    }
}
