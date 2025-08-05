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
    public class Purchase
    {
        [Key]
        public int Code { get; set; }
        public int PointsBalance { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual User? User { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Rental>? Rentals { get; set; }
        public int PackageId { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual Package? Package { get; set; }

    }
}
