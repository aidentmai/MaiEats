// using AutoMapper;
// using MaiEats.Core.DbContext;
// using MaiEats.Core.Dtos.Category;
// using MaiEats.Core.Models;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
//
// namespace MaiEats.Core.Controllers;
//
// [ApiController]
// [Route("api/[controller]")]
//
// public class CategoryController : ControllerBase
// {
//     private ApplicationDbContext _context { get; }
//     private IMapper _mapper { get; }
//
//     public CategoryController(ApplicationDbContext context, IMapper mapper)
//     {
//         _context = context;
//         _mapper = mapper;
//     }
//     
//     // CRUD Operations
//     
//     [HttpPost("Create")]
//     public async Task<ActionResult<Category>> CreateCategory([FromBody] CreateCategoryDto categoryDto)
//     {
//         if (!ModelState.IsValid)
//         {
//             return BadRequest(ModelState);
//         }
//
//         var newCategory = _mapper.Map<Category>(categoryDto);
//         await _context.Categories.AddAsync(newCategory);
//         await _context.SaveChangesAsync();
//
//         return Ok("Category created successfully");
//     }
//     [HttpGet("Get")]
//     public async Task<ActionResult<IEnumerable<GetCategoryDto>>> GetCategory()
//     {
//         var categories = await _context.Categories.ToListAsync();
//         if (categories == null || categories.Count == 0)
//         {
//             return NotFound();
//         }
//
//         var convertedCategories = _mapper.Map<IEnumerable<GetCategoryDto>>(categories);
//
//         return Ok(convertedCategories);
//     }
// }