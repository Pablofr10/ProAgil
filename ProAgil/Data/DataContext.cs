using Microsoft.EntityFrameworkCore;
using ProAgil.Model;

namespace ProAgil.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<Evento> Eventos { get; set; }
    }
}