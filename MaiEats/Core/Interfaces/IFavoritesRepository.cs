using MaiEats.Core.Models;
using MaiEats.Models;

namespace MaiEats.Core.Interfaces;

public interface IFavoritesRepository
{
    Task<List<Business>> GetUserFavorites(User user);
}