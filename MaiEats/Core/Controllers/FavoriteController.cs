using AutoMapper;
using MaiEats.Core.DbContext;
using MaiEats.Core.Dtos.Business;
using MaiEats.Core.Extensions;
using MaiEats.Core.Interfaces;
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
}