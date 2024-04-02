using MaiEats.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace MaiEats.Models;

public class User : IdentityUser 
{ 
    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
}