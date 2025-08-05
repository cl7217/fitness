using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public class CategoryRepository : IRepository<Category>
    {
        private GymDB gymDB;

        public CategoryRepository(GymDB gymDB)
        {
            this.gymDB = gymDB;
        }

        public Category Add(Category entity)
        {
            gymDB.Categories.Add(entity);
            gymDB.SaveChanges();
            return entity;
        }

        public void Delete(Category entity)
        {
            gymDB.Categories.Remove(entity);
            gymDB.SaveChanges();
        }

        public List<Category> GetAll()
        {
            return gymDB.Categories.ToList();
        }


        public Category GetById(int id)
        {
            return gymDB.Categories.Find(id);
        }

        public Category Update(Category entity)
        {
            gymDB.Categories.Update(entity);
            gymDB.SaveChanges();
            return entity;
        }
    }
}
