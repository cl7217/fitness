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
    public class Package
    {
        [Key]
        public int Code { get; set; }
        public int Qty { get; set; }// כמות
        public int Price { get; set; }
        public string Name { get; set; }

        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Purchase>? Purchases { get; set; }
    }
}
