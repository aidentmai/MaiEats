using AutoMapper;
using MaiEats.Core.DbContext;
using MaiEats.Core.Dtos.Business;
using MaiEats.Core.Extensions;
using MaiEats.Core.Interfaces;
using MaiEats.Core.Models;
using MaiEats.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MaiEats.Core.Controllers;

[Route("api/[controller]")]
[ApiController]

public class FavoriteController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly IFavoritesRepository _favoritesRepo;
    
    public FavoriteController(UserManager<User> userManager, IFavoritesRepository favoritesRepo)
    {
        _userManager = userManager;
        _favoritesRepo = favoritesRepo;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult> GetUserFavorites()
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        var userFavorites = await _favoritesRepo.GetUserFavorites(appUser);
    
        return Ok(userFavorites);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult> AddFavorite(int id)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username); 
        var business = await _favoritesRepo.GetByIdAsync(id);

        if (business == null) return BadRequest("Business not found");

        var userFavorite = await _favoritesRepo.GetUserFavorites(appUser);

        if (userFavorite.Any(e => e.Id == id)) return BadRequest("Cannot add same business to favorites");

        var favoriteModel = new Favorite
        {
            BusinessId = business.Id,
            UserId = appUser.Id
        };

        await _favoritesRepo.CreateAsync(favoriteModel);

        if (favoriteModel == null)
        {
            return StatusCode(500, "Could not create");
        }
        else
        {
            return Created();
        }
    }

    [HttpDelete]
    [Authorize]
    public async Task<ActionResult> DeleteFavorite(int id)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);

        var userFavorites = await _favoritesRepo.GetUserFavorites(appUser);

        var filteredBusiness = userFavorites.Where(i => i.Id == id).ToList();

        if (filteredBusiness.Count() == 1)
        {
            await _favoritesRepo.DeleteFavorite(appUser, id);
        }
        else
        {
            return BadRequest("Business is not in your favorites");
        }

        return Ok("Business removed");
    }
}