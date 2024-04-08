using System.Net.Http.Headers;
using AutoMapper;
using MaiEats.Core.DbContext;
using MaiEats.Core.Dtos.Business;
using MaiEats.Core.Interfaces;
using MaiEats.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace MaiEats.Core.Controllers;

[ApiController]
[Route("api/[controller]")]

public class BusinessController : ControllerBase
{
    private ApplicationDbContext _context { get; }
    private IMapper _mapper { get; }
    private HttpClient _httpClient;
    private IKeyVaultSecretService _keyVaultSecretService;

    public BusinessController(ApplicationDbContext context, IMapper mapper, HttpClient httpClient, IKeyVaultSecretService keyVaultSecretService)
    {
        _context = context;
        _mapper = mapper;
        _httpClient = httpClient;
        _keyVaultSecretService = keyVaultSecretService;
    }
    
    // CRUD Operations

    [HttpPost("Create")]
    [Authorize]
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
    
    [HttpPost("CreateByBusinessId/{businessId}")]
    [Authorize]
    public async Task<ActionResult> CreateBusinessByBusinessId([FromRoute] string businessId)
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Add("accept", "application/json");

            // Fetch Yelp API key from Azure Key Vault
            var yelpFusionKey = await _keyVaultSecretService.GetSecretAsync("APIKEY");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", yelpFusionKey);

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://api.yelp.com/v3/businesses/{businessId}"),
            };

            using (var response = await _httpClient.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                var businessDetails = JsonConvert.DeserializeObject<YelpFusionBusiness>(body);

                // Create a new business object in the database
                var business = new Business
                {
                    BusinessName = businessDetails.Name,
                    Address = businessDetails.Location.Address1,
                    City = businessDetails.Location.City,
                    ZipCode = businessDetails.Location.Zip_Code,
                    Country = businessDetails.Location.Country,
                    State = businessDetails.Location.State,
                    Category = businessDetails.Categories?.FirstOrDefault()?.Title
                };

                _context.Businesses.Add(business);
                await _context.SaveChangesAsync();

                return Ok(business);
            }
        }
        catch (Exception e)
        {
            // Log the exception or handle it as needed
            return StatusCode(500, e.Message);
        }
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
    
    [HttpGet("search")]
    public async Task<IActionResult> SearchBusinesses(string location, string term, string categories, string sort_by, int limit)
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Add("accept", "application/json");
            
            // Fetch Yelp API key from Azure Key Vault
            var yelpFusionKey = await _keyVaultSecretService.GetSecretAsync("APIKEY");
            
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", yelpFusionKey);

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://api.yelp.com/v3/businesses/search?location={location}&term={term}&categories={categories}&sort_by={sort_by}&limit={limit}"),
            };

            using (var response = await _httpClient.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                   
                
                return Ok(body);
            }
        }
        catch (Exception e)
        {
            // Log the exception or handle it as needed
            return StatusCode(500, e.Message);
        }
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<Business?> Update([FromRoute] int id, [FromBody] UpdateBusinessRequestDto updateDto)
    {
        var existingBusiness = await _context.Businesses.FirstOrDefaultAsync(x => x.Id == id);
        existingBusiness.BusinessName = updateDto.BusinessName;
        existingBusiness.Address = updateDto.Address;
        existingBusiness.City = updateDto.City;
        existingBusiness.ZipCode = updateDto.ZipCode;
        existingBusiness.Country = updateDto.Country;
        existingBusiness.State = updateDto.State;
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