
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {            
        }

        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Value>().
            HasData(
                new Value {Id=1, Name = "Rehna"},
                new Value{Id=2, Name="Krishnan"}
            );
        }

        public DbSet<Value> Values { get; set; }
    }
}
