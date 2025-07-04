using SimpleWebAPI.Models;

namespace SimpleWebAPI.Services
{
    public interface IKontrahentService
    {
        List<Kontrahent> GetAll();
        Kontrahent? GetById(int id);
        Kontrahent Add(Kontrahent kontrahent);
        bool Update(int id, Kontrahent updated);
        bool Delete(int id);
    }
}