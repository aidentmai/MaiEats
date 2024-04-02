using System.ComponentModel.DataAnnotations;
using MaiEats.Core.Enums;
using MaiEats.Models;

namespace MaiEats.Core.Models;

public class Favorite : BaseEntity
{
    [MaxLength(10)]
    public PriorityLevel PriorityLevel { get; set; }
    
    // Relations & Navigation
    public string UserId { get; set; }
    public int BusinessId { get; set; }
    public User User { get; set; }
    public Business Business { get; set; }
}