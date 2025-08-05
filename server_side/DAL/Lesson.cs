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
    public class Lesson
    {
        [Key]
        public int Code { get; set; }
        public string Name { get; set; }
        public  int Day{ get; set; }
        public int Hour { get; set; }
        public int PointsPerHour { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Rental> Rentals { get; set; }
        public int CategoryId { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual Category Category { get; set; }
        
    }
}
 