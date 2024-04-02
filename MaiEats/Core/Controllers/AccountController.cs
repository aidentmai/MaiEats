using MaiEats.Core.Dtos.Account;
using MaiEats.Core.Service;
using MaiEats.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MaiEats.Core.Controllers;

[Route("api/[controller]")]
[ApiController]

public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;
    private readonly SignInManager<User> _signInManager;
    
    public AccountController(UserManager<User> userManager, TokenService tokenService, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }

    [HttpPost("Login")]
    public async Task<ActionResult> Login(LoginDto loginDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("Invalid username!");

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

        return Ok(new NewUserDto
        {
            Username = user.UserName,
            Email = user.Email,
            Token = _tokenService.CreateToken(user)
        });
    }

    [HttpPost("Register")]
    public async Task<ActionResult> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var appUser = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };

            var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

            if (createdUser.Succeeded)
            {
                var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                if (roleResult.Succeeded)
                {
                    return Ok(new NewUserDto
                    {
                        Username = appUser.UserName,
                        Email = appUser.Email,
                        Token = _tokenService.CreateToken(appUser)
                    });
                }
                else
                {
                    return StatusCode(500, roleResult.Errors);
                }
            }
            else
            {
                return StatusCode(500, createdUser.Errors);
            }
        }
        catch (Exception e)
        {
            return StatusCode(500, e);
        }
    }
    
}