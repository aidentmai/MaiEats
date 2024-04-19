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
               BusinessId = business.Business.BusinessId,
               BusinessName = business.Business.BusinessName,
               Address = business.Business.Address,
               City = business.Business.City,
               ZipCode = business.Business.ZipCode,
               Country = business.Business.Country,
               State = business.Business.State,
               Category = business.Business.Category,
               PriorityLevel = business.Business.PriorityLevel,
               image_url = business.Business.image_url
            })
            .ToListAsync();
    }

    public async Task<Business?> GetByIdAsync(int id)
    {
        return await _context.Businesses.FirstOrDefaultAsync(i => i.Id == id);
        
    }

    public async Task<Favorite> CreateAsync(Favorite favorite)
    {
        await _context.Favorites.AddAsync(favorite);
        await _context.SaveChangesAsync();

        return favorite;
    }

    public async Task<Favorite> DeleteFavorite(User user, int id)
    {
        var favoriteModel = await _context.Favorites.FirstOrDefaultAsync(i => i.UserId == user.Id && i.Business.Id == id);

        if (favoriteModel == null)
        {
            return null;
        }

        _context.Favorites.Remove(favoriteModel);
        await _context.SaveChangesAsync();

        return favoriteModel;
    }
}