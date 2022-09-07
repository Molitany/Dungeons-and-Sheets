using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
    public class DnD5eContext : DbContext
    {
        public DbSet<Character> Characters { get; set; }
    }
}
