using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public interface IRentalRepository : IRepository<Rental>    
    {
        List<Rental> GetRentalsByPurchaseId(int purchaseId);
        List<Rental> RentalsByUserId(int userId);
    }
}
