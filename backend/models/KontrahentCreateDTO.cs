using System.ComponentModel.DataAnnotations;
using Microsoft.VisualBasic;
using SimpleWebAPI.Constants;

public class KontrahentCreateDTO
{
    [Required(ErrorMessage = ErrorMessages.NameRequired)]
    [StringLength(100, ErrorMessage = ErrorMessages.NameTooLong)]
    public string Name { get; set; } = string.Empty;

    public Dictionary<string, string> AdditionalFields { get; set; } = new();
}