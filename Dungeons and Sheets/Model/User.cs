using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public ICollection<Character> Characters { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; } //Stored as hashed and salted base64 encoding
        //public Content Content { get; set; }

    }
}