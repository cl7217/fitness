using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DAL
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Lesson> Lessons { get; set; }
    }
}
