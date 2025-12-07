using Microsoft.EntityFrameworkCore;
using HotelBediaX.Core.Entities;

namespace HotelBediaX.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }
        public DbSet<Destination> Destinations { get; set; } = null!;
    }
}
