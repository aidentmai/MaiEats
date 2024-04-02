using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MaiEats.Core.Enums;

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
    public PriorityLevel PriorityLevel { get; set; }
    
    // Relations & Navigation
    public List<Favorite> Favorites { get; set; } = new List<Favorite>();
    // public Category? Category { get; set; }
}