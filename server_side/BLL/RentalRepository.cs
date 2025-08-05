using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public class RentalRepository : IRentalRepository
    {
        private GymDB gymDB;

        public RentalRepository(GymDB gymDB)
        {
            this.gymDB = gymDB;
        }

        public Rental Add(Rental entity)
        {
            gymDB.Rentals.Add(entity);
            gymDB.SaveChanges();
            return entity;
        }
        public List<Rental> GetAll()
        {
            return gymDB.Rentals.ToList();
        }

        public void Delete(Rental entity)
        {
            gymDB.Rentals.Remove(entity);
            gymDB.SaveChanges();
        }

        public Rental GetById(int id)
        {
            return gymDB.Rentals.Find(id);
        }

        public Rental Update(Rental entity)
        {
            gymDB.Rentals.Update(entity);
            gymDB.SaveChanges();
            return entity;
        }

        public List<Rental> GetRentalsByPurchaseId(int purchaseId)
        {
            return gymDB.Rentals
                    .Where(r => r.PurchaseId == purchaseId)
                    .ToList();
        }

        public List<Rental> RentalsByUserId(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
