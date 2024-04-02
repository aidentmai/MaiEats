using MaiEats.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace MaiEats.Models;

public class User : IdentityUser 
{ 
    public List<Favorite> Favorites { get; set; } = new List<Favorite>();
}