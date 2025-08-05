using System.Collections.Generic;
using System.Linq;
using DAL;
using AutoMapper;
using DTO;
using Microsoft.EntityFrameworkCore;

namespace BLL
{
    public class UserRepository : IUserRepository
    {
        private GymDB gymDB;
        private IMapper mapper;

        public UserRepository(GymDB gymDB,IMapper mapper)
        {
            this.gymDB = gymDB;
            this.mapper = mapper;
        }

        public UserDTO Add(UserDTO entity)
        {
            gymDB.Users.Add(mapper.Map<User>(entity));
            gymDB.SaveChanges();
            return entity;
        }

        public UserDTO SignUp(User entity)
        {
            gymDB.Users.Add(entity);
            gymDB.SaveChanges();
            return mapper.Map<UserDTO>(entity);
        }
        public UserDTO SignIn(string pass, string email)
        {
            User u = gymDB.Users.Where(x => x.Email.Equals(email)).FirstOrDefault();
            if (u == null)
                return null;
            if (u.Password != pass)
                return null;
            return mapper.Map<UserDTO>(u);
        }
        public void Delete(UserDTO entity)
        {
            gymDB.Users.Remove(mapper.Map<User>(entity));
            gymDB.SaveChanges();
        }

        public List<UserDTO> GetAll()
        {
            return mapper.Map<List<UserDTO>>(gymDB.Users.ToList());
        }

        public UserDTO GetById(int id)
        {
            User u = gymDB.Users.Find(id);
            return mapper.Map<UserDTO>(u);
        }

        public UserDTO Update(UserDTO entity)
        {
            gymDB.Users.Update(mapper.Map<User>(entity));
            gymDB.SaveChanges();
            return entity;
        }

        public User GetUserById(int id)
        {
            return gymDB.Users.Find(id);
        }

        public User GetByEmail(string email)
        {
            return gymDB.Users.FirstOrDefault(u => u.Email == email);
        }


    }
}
