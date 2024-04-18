namespace MaiEats.Core.Dtos.Business;

public class CreateBusinessDto
{
    public string BusinessId { get; set; } = String.Empty;
    public string BusinessName { get; set; } = String.Empty;
    public string Address { get; set; } = String.Empty;
    public string City { get; set; } = String.Empty;
    public string ZipCode { get; set; } = String.Empty;
    public string Country { get; set; } = String.Empty;
    public string State { get; set; } = String.Empty;
    public string Category { get; set; } = String.Empty;
    public string image_url { get; set; } = String.Empty;
}