using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Model.DTO
{
    public class UserDTO
    {
        public string Email;
        public string Name;
        public string Password;
    }
}
