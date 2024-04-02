// using AutoMapper;
// using MaiEats.Core.DbContext;
// using MaiEats.Core.Dtos.User;
// using MaiEats.Models;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
//
// namespace MaiEats.Core.Controllers;
//
// [ApiController]
// [Route("api/[controller]")]
//
// public class UserController : ControllerBase
// {
//     private readonly ApplicationDbContext _context;
//     private readonly IMapper _mapper;
//     public UserController(ApplicationDbContext context, IMapper mapper)
//     {
//         _context = context;
//         _mapper = mapper;
//     }
//     
//     // CRUD Operations
//
//     [HttpPost("Create")]
//     public async Task<ActionResult> CreateUser([FromBody] CreateUserDto userDto)
//     {
//         if (!ModelState.IsValid)
//         {
//             return BadRequest(ModelState);
//         }
//
//         var newUser = _mapper.Map<User>(userDto);
//         await _context.Users.AddAsync(newUser);
//         await _context.SaveChangesAsync();
//
//         return Ok("Created user successfully");
//     }
//
//     [HttpGet("Get")]
//     public async Task<ActionResult<IEnumerable<GetUserDto>>> GetUsers()
//     {
//         var users = await _context.Users.ToListAsync();
//         var convertedUsers = _mapper.Map<IEnumerable<GetUserDto>>(users);
//
//         return Ok(convertedUsers);
//     }
//
//     [HttpGet]
//     [Route("{id:int}")]
//     public async Task<ActionResult> GetById([FromRoute] int id)
//     {
//         if (!ModelState.IsValid)
//             return BadRequest(ModelState);
//
//         var userModel = await _context.Users.FirstOrDefaultAsync(i => i.Id == id);
//
//         if (userModel == null)
//         {
//             return NotFound();
//         }
//
//         return Ok(userModel);
//     }
//     
// }