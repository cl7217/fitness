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
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public  virtual List<Purchase>? Purchases { get; set; }
        public int? HealthFundId { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual HealthFund? HealthFund { get; set; }
    }
}
