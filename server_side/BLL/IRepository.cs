﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public interface IRepository<T>
    {
        T GetById(int id);
        T Add(T entity);
        T Update(T entity);
        void Delete(T entity);
        List<T> GetAll();
    }
}
