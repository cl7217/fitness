using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
namespace BLL
{
    public interface IPurchaseRepository :IRepository<PurchaseDTO>
    {
        List<PurchaseDTO> PurchasesByUserId(int userId);
        PurchaseDTO AddPurchase(Purchase entity);
        List<Purchase> GetPurchasesByUserId(int userId);
        void Update(Purchase purchase);
    }
}
