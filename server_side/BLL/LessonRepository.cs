using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public class LessonRepository : IRepository<Lesson>

    {

        private GymDB gymDB;

        public LessonRepository(GymDB gymDB)
        {
            this.gymDB = gymDB;
        }
        public Lesson Add(Lesson entity)
        {
            gymDB.Lessons.Add(entity);
            gymDB.SaveChanges();
            return entity;
        }
        public List<Lesson> GetAll()
        {
            return gymDB.Lessons.ToList();
        }
        public void Delete(Lesson entity)
        {
           gymDB.Lessons.Remove(entity);
            gymDB.SaveChanges();
        }

        public Lesson GetById(int id)
        {
            return gymDB.Lessons.Find(id);
        }

        public Lesson Update(Lesson entity)
        {
            gymDB.Lessons.Update(entity);
            gymDB.SaveChanges();
            return entity;
        }
    }
}
