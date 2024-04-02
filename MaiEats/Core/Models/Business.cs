using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MaiEats.Core.Models;

public class Business : BaseEntity
{
    [MaxLength(30)]
    public string BusinessName { get; set; } = String.Empty;
    [MaxLength(50)]
    public string Address { get; set; } = String.Empty;
    [MaxLength(100)]
    public string Description { get; set; } = String.Empty;
    [MaxLength(25)]
    public string Category { get; set; } = String.Empty;
    
    // Relations & Navigation
    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    // public Category? Category { get; set; }
}