using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using DAL;
namespace DTO
{
    public class PurchaseDTO
    {
        
            
            public int Code { get; set; }
            public int PointsBalance { get; set; }
            public DateTime Date { get; set; }
            public int UserId { get; set; }
            public string PackageName { get; set; }
           
        
    }
}
