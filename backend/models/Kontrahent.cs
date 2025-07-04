using System.ComponentModel.DataAnnotations;
using SimpleWebAPI.Constants;

namespace SimpleWebAPI.Models
{
    public class Kontrahent
    {
        public int Id { get; set; }

        [Required(ErrorMessage = ErrorMessages.NameRequired)]
        [StringLength(100, ErrorMessage = ErrorMessages.NameTooLong)]
        public string? Name { get; set; }
        public Dictionary<string, string> AdditionalFields { get; set; } = new();
    }
}