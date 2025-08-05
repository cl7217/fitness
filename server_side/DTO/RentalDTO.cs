using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class RentalDTO
    {
       
            public int Code { get; set; }
            public DateTime? ReallyEnter { get; set; }
            public DateTime? ReallyExit { get; set; }
            public int PointsDeducated { get; set; }
            public int LessonId { get; set; }
            public string LessonName { get; set; }
            public int PurchaseId { get; set; }
        
    }
}
