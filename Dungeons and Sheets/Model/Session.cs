using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class Session
    {
        [Key]
        public string sessionId { get; set; }
        public User user { get; set; }
    }
}