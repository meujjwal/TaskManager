using Microsoft.EntityFrameworkCore;

namespace TaskManager.Service.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // DbSet property for the Task model
        public DbSet<Task> Tasks { get; set; }
    }
}
