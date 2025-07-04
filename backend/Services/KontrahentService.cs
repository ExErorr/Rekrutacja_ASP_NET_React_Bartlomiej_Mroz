using SimpleWebAPI.Models;
using SimpleWebAPI.Data;

namespace SimpleWebAPI.Services
{
    public class KontrahentService : IKontrahentService
    {
        private readonly AppDbContext _context;

        public KontrahentService(AppDbContext context)
        {
            _context = context;
        }

        public List<Kontrahent> GetAll() => _context.Kontrahenci.ToList();

        public Kontrahent? GetById(int id) =>
            _context.Kontrahenci.FirstOrDefault(k => k.Id == id);

        public Kontrahent Add(Kontrahent kontrahent)
        {
            _context.Kontrahenci.Add(kontrahent);
            _context.SaveChanges();
            return kontrahent;
        }

        public bool Update(int id, Kontrahent updated)
        {
            var existing = GetById(id);
            if (existing == null) return false;

            existing.Name = updated.Name;
            existing.AdditionalFields = updated.AdditionalFields ?? new();
            _context.SaveChanges();

            return true;
        }

        public bool Delete(int id)
        {
            var existing = GetById(id);
            if (existing == null) return false;

            _context.Kontrahenci.Remove(existing);
            _context.SaveChanges();

            return true;
        }
    }
}