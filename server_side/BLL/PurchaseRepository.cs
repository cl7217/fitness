using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DAL;
using DTO;
using Microsoft.EntityFrameworkCore;

namespace BLL
{
    public class PurchaseRepository : IPurchaseRepository
    {
        private GymDB gymDB;
        private IMapper mapper;

        public PurchaseRepository(GymDB gymDB, IMapper mapper)
        {
            this.gymDB = gymDB;
            this.mapper = mapper;
        }


        public void Delete(PurchaseDTO entity)
        {
            gymDB.Purchases.Remove(mapper.Map<Purchase>(entity));
            gymDB.SaveChanges();
        }

        public List<PurchaseDTO> GetAll()
        {
            return mapper.Map<List<PurchaseDTO>>(gymDB.Purchases.ToList());
        }

        public PurchaseDTO GetById(int id)
        {
            Purchase p = gymDB.Purchases.Find(id);
            return mapper.Map<PurchaseDTO>(p);
        }

        public PurchaseDTO Update(PurchaseDTO entity)
        {
            gymDB.Purchases.Update(mapper.Map<Purchase>(entity));
            gymDB.SaveChanges();
            return entity;
        }

        public List<PurchaseDTO> PurchasesByUserId(int userId)
        {
            return mapper.Map<List<PurchaseDTO>>(gymDB.Purchases.Where(x => x.UserId == userId).ToList());  
        }

        public PurchaseDTO AddPurchase(Purchase entity)
        {
            gymDB.Purchases.Add(entity);
            gymDB.SaveChanges();
            return mapper.Map<PurchaseDTO>(entity);
        }

        //not to use
        public PurchaseDTO Add(PurchaseDTO entity)
        {
            gymDB.Purchases.Add(mapper.Map<Purchase>(entity));
            gymDB.SaveChanges();
            return entity;
        }

        public List<Purchase> GetPurchasesByUserId(int userId)
        {
            return gymDB.Purchases
                        .Where(p => p.UserId == userId)
                        .ToList();
        }

        public void Update(Purchase purchase)
        {
            gymDB.Purchases.Update(purchase);
            gymDB.SaveChanges();
        }
    }
}





