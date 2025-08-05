using DAL;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace DTO
{
    public class UserDTO
    {
        [Key]
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Purchase>? Purchases { get; set; }
        public string? HealthFundName { get; set; }
        

    }
}