using Microsoft.EntityFrameworkCore;
using ZavrsnaAPP.Models;

namespace ZavrsnaAPP.Data
{
    public class ZavrsnaContext:DbContext
    {
        public ZavrsnaContext(DbContextOptions<ZavrsnaContext> opcije): base(opcije)
        {

        }

        public DbSet<Oruzje> Oruzja { get; set; }

    }
}
