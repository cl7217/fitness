using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public class HealthFundRepository : IRepository<HealthFund>
    {
        private GymDB gymDB;

        public HealthFundRepository(GymDB gymDB)
        {
            this.gymDB = gymDB;
        }
        public List<HealthFund> GetAll()
        {
            return gymDB.HealthFunds.ToList();
        }

        public HealthFund Add(HealthFund entity)
        {
            gymDB.HealthFunds.Add(entity);
            gymDB.SaveChanges();
            return entity;
        }

        public void Delete(HealthFund entity)
        {
            gymDB.HealthFunds.Remove(entity);
            gymDB.SaveChanges();
        }

        public HealthFund GetById(int id)
        {
            return gymDB.HealthFunds.Find(id);
        }

        public HealthFund Update(HealthFund entity)
        {
            gymDB.HealthFunds.Update(entity);
            gymDB.SaveChanges();
            return entity;
        }
    }
}
