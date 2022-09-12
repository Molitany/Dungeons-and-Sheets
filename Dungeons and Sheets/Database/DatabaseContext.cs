using backend.Model;
using Microsoft.EntityFrameworkCore;


namespace backend.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }
        public DbSet<Character> Characters { get; set; }
        //public DbSet<Content> Content { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Session> Sessions { get; set; }

        public DbSet<TTRPGSystem> Systems { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var TrulyTest = new User { Id = 1, Name = "TrulyTest", Password = "password" };
            modelBuilder.Entity<User>().HasData(
                TrulyTest
            );

            var bobby = new Character
            {
                Id = 1,
                UserId = 1,
                Name = "Bobby King",
                Sex = "Male",
                HairColor = "Brown",
                EyeColor = "Green",
                SkinColor = "Black",
                Description = "A knight from the Southlands, searching for love and glory in a faraway land.",
                Age = 32,
                Height = "180cm",
                Weight = "78kg",
                Image = "notimplemented"
            };

            modelBuilder.Entity<Character>().HasData(
                bobby
            );

        }
    }
}