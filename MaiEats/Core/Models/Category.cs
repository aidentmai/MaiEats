// using System.ComponentModel.DataAnnotations;
//
// namespace MaiEats.Core.Models;
//
// public class Category : BaseEntity
// {
//     [MaxLength(25)]
//     public string CategoryName { get; set; } = String.Empty;
//     
//     // Relations & Navigation
//     public ICollection<Business> Businesses { get; set; } = new List<Business>();
// }