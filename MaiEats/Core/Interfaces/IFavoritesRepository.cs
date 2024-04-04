using MaiEats.Core.Models;
using MaiEats.Models;

namespace MaiEats.Core.Interfaces;

public interface IFavoritesRepository
{
    Task<List<Business>> GetUserFavorites(User user);
    Task<Business?> GetByIdAsync(int id);
    Task<Favorite> CreateAsync(Favorite favorite);
    Task<Favorite> DeleteFavorite(User user, int id);
}