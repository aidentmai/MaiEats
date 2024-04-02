using MaiEats.Core.Enums;
using MaiEats.Core.Models;
using MaiEats.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MaiEats.Core.DbContext;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    // Creating the database tables
    public DbSet<Business> Businesses { get; set; }
    // public DbSet<Category> Categories { get; set; }
    public DbSet<Favorite> Favorites { get; set; }
    
    // Creating the relationship between entities
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        List<IdentityRole> roles = new List<IdentityRole>
        {
            new IdentityRole
            {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Name = "User",
                NormalizedName = "USER"
            },
        };
        modelBuilder.Entity<IdentityRole>().HasData(roles);

        modelBuilder.Entity<Favorite>(x => x.HasKey(f => new {f.UserId, f.BusinessId}));
        
        modelBuilder.Entity<Favorite>()
            .HasOne(favorite => favorite.User)
            .WithMany(user => user.Favorites)
            .HasForeignKey(favorite => favorite.UserId);
        
        modelBuilder.Entity<Favorite>()
            .HasOne(favorite => favorite.Business)
            .WithMany(business => business.Favorites)
            .HasForeignKey(favorite => favorite.BusinessId);

        modelBuilder.Entity<Favorite>()
            .Property(favorite => favorite.PriorityLevel)
            .HasConversion<string>();
        
        modelBuilder.Entity<Business>()
            .Property(business => business.PriorityLevel)
            .HasConversion<string>();
        
        

        // modelBuilder.Entity<User>()
        //     .HasMany(user => user.Favorites);

    }
    
}