using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BLL
{
    public interface IUserRepository : IRepository<UserDTO>
    {
        UserDTO SignIn(string pass,string email);
        UserDTO SignUp(User entity);
        User GetUserById(int id);
        User GetByEmail(string email);
    }
}
