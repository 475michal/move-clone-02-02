using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IRepository<T>
    {
        public List<T> GetAll();
        public T GetById(int id);
        public void delete(int id);
        public void update(int id, T entity);
        public void addItem(T item);
    }
}
