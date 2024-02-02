using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IService<T>
    {
        public List<T> getAll();
        public T get(int id);
        public void update(int id, T entity);
        public void delete(int id);
        public void Add(T entity);
    }
}
