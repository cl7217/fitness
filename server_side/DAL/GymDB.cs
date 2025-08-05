
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class GymDB : DbContext 
    { 
        public GymDB(DbContextOptions<GymDB> options) : base(options)
        {
        }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<HealthFund> HealthFunds { get; set; }
        public  DbSet<Purchase> Purchases { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
