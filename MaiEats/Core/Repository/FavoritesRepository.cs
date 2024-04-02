using MaiEats.Core.DbContext;
using MaiEats.Core.Enums;
using MaiEats.Core.Interfaces;
using MaiEats.Core.Models;
using MaiEats.Models;
using Microsoft.EntityFrameworkCore;

namespace MaiEats.Core.Repository;

public class FavoritesRepository : IFavoritesRepository
{
    private readonly ApplicationDbContext _context;
    public FavoritesRepository(ApplicationDbContext context)
    {
        _context = context;
    }
          
    public async Task<List<Business>> GetUserFavorites(User user)
    {
        return await _context.Favorites
            .Where(fav => fav.UserId == user.Id)
            .Select(business => new Business
            {
               Id = business.BusinessId,
               BusinessName = business.Business.BusinessName,
               Address = business.Business.Address,
               Description = business.Business.Description,
               Category = business.Business.Category,
               PriorityLevel = business.Business.PriorityLevel
            })
            .ToListAsync();
    }
}