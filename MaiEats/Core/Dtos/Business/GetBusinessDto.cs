using MaiEats.Core.Enums;

namespace MaiEats.Core.Dtos.Business;

public class GetBusinessDto
{
    public int Id { get; set; }
    public string BusinessName { get; set; } = String.Empty;
    public string Address { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public string Category { get; set; } = String.Empty;
    public PriorityLevel PriorityLevel { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}