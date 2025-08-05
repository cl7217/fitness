using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public class PackageRepository : IRepository<Package>
    {
        private GymDB gymDB;

        public PackageRepository(GymDB gymDB)
        {
            this.gymDB = gymDB;
        }

        public Package Add(Package entity)
        {
            gymDB.Packages.Add(entity);
            gymDB.SaveChanges();
            return entity;
        }
        public List<Package> GetAll()
        {
            return gymDB.Packages.ToList();
        }
        public void Delete(Package entity)
        {
            gymDB.Packages.Remove(entity);
            gymDB.SaveChanges();
        }

        public Package GetById(int id)
        {
           return gymDB.Packages.Find(id);
        }

        public Package Update(Package entity)
        {
            gymDB.Packages.Update(entity);
            gymDB.SaveChanges();
            return entity;
        }
    }
}
