using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using SimpleWebAPI.Models;

namespace SimpleWebAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Kontrahent> Kontrahenci { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Kontrahent>()
                .Property(k => k.AdditionalFields)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<Dictionary<string, string>>(v, new JsonSerializerOptions())
                );
        }
    }
}