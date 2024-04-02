namespace MaiEats.Core.Dtos.Business;

public class CreateBusinessDto
{
    public string BusinessName { get; set; } = String.Empty;
    public string Address { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public string Category { get; set; } = String.Empty;

}