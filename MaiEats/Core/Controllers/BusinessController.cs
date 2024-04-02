using AutoMapper;
using MaiEats.Core.DbContext;
using MaiEats.Core.Dtos.Business;
using MaiEats.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MaiEats.Core.Controllers;

[ApiController]
[Route("api/[controller]")]

public class BusinessController : ControllerBase
{
    private ApplicationDbContext _context { get; }
    private IMapper _mapper { get; }

    public BusinessController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    // CRUD Operations

    [HttpPost("Create")]
    public async Task<ActionResult> CreateBusiness([FromBody] CreateBusinessDto businessDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var newBusiness = _mapper.Map<Business>(businessDto);
        await _context.Businesses.AddAsync(newBusiness);
        await _context.SaveChangesAsync();

        return Ok("Created business successfully");
    }

    [HttpGet("Get")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<GetBusinessDto>>> GetBusinesses()
    {
        var businesses = await _context.Businesses.ToListAsync();
        var convertedBusinesses = _mapper.Map<IEnumerable<GetBusinessDto>>(businesses);

        return Ok(convertedBusinesses);
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<ActionResult> GetById([FromRoute] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var businessModel = await _context.Businesses.FirstOrDefaultAsync(i => i.Id == id);

        if (businessModel == null)
        {
            return NotFound();
        }

        return Ok(businessModel);
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<Business?> Update([FromRoute] int id, [FromBody] UpdateBusinessRequestDto updateDto)
    {
        var existingBusiness = await _context.Businesses.FirstOrDefaultAsync(x => x.Id == id);
        existingBusiness.BusinessName = updateDto.BusinessName;
        existingBusiness.Address = updateDto.Address;
        existingBusiness.Description = updateDto.Description;
        existingBusiness.Category = updateDto.Category;

        await _context.SaveChangesAsync();
        
        return existingBusiness;
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<ActionResult> Delete([FromRoute] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var businessModel = await _context.Businesses.FirstOrDefaultAsync(i => i.Id == id);

        if (businessModel == null)
        {
            return null;
        }

        _context.Businesses.Remove(businessModel);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
}