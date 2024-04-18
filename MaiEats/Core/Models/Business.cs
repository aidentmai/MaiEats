using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;
using MaiEats.Core.Enums;

namespace MaiEats.Core.Models;

public class Business : BaseEntity
{
    [MaxLength(50)]
    public string BusinessId { get; set; } = String.Empty;
    [MaxLength(30)]
    public string BusinessName { get; set; } = String.Empty;
    [MaxLength(30)]
    public string Address { get; set; } = String.Empty;
    [MaxLength(15)]
    public string City { get; set; } = String.Empty;
    [MaxLength(5)]
    public string ZipCode { get; set; } = String.Empty;
    [MaxLength(15)]
    public string Country { get; set; } = String.Empty;
    [MaxLength(15)]
    public string State { get; set; } = String.Empty;
    [MaxLength(25)]
    public string Category { get; set; } = String.Empty;
    public string image_url { get; set; } = String.Empty;
    public PriorityLevel PriorityLevel { get; set; }
    
    // Relations & Navigation
    public List<Favorite> Favorites { get; set; } = new List<Favorite>();
    // public Category? Category { get; set; }
}