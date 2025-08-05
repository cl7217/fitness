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
    public class Rental
    {
        [Key]
        public int Code { get; set; }
        public int PointsDeducated { get; set; }
        public DateTime? ReallyEnter { get; set; }
        public DateTime? ReallyExit { get; set; }
        public int LessonId { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public  virtual Lesson Lesson { get; set; }  
        public int PurchaseId { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual Purchase Purchases { get; set; }
        
    }
}
