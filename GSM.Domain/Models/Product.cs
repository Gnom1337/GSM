using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GSM.Domain.Models
{
    public class Product 
    {
        [Key]
        public int ProductId { get; set; }
        public string Name { get; set; }
        public double Density {  get; set; }

       
    }
}
