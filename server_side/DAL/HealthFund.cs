using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DAL
{
    public class HealthFund
    {
        [Key]
        public int Code { get; set; }
        public string Name { get; set; }
        public double DiscountPrecent { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<User> Users { get; set; }

    }
}
